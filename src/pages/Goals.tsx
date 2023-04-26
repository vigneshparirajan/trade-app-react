import { Container, Grid, Modal, Title, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { useState } from 'react';

export const Goals = ({
  investment,
  opened,
  close,
}: {
  investment: number;
  opened: boolean;
  close: any;
}) => {
  const clipboard = useClipboard({ timeout: 500 });
  const [copied, setCopied] = useState(0);

  // Create 20% increment investment list
  const investments = () => {
    let list = [];
    let invest = investment;
    list.push(invest);
    for (let index = 0; index < 15; index++) {
      invest = Math.round(invest * 0.2 + invest);
      list.push(invest);
    }
    return list;
  };

  const onCopy = (amount: number) => {
    setCopied(amount);
    clipboard.copy(Math.round((amount * 0.25) / 3));
    setTimeout(() => close(), 500);
  };

  return (
    <Modal fullScreen opened={opened} onClose={close}>
      <Container size="xs" px={10}>
        <Title order={1} mt={-5}>
          Trade Goals
        </Title>
        {investment > 0 &&
          investments().map((v, i) => {
            return (
              <Grid
                grow
                key={i}
                mt={10}
                onClick={() => onCopy(v)}
                bg={copied === v && clipboard.copied ? 'teal' : 'gray'}
                style={{ borderRadius: '10px', textAlign: 'center' }}
              >
                <Grid.Col span={3}>{v}</Grid.Col>
                <Grid.Col span={3}>{Math.round(v * 0.2)}</Grid.Col>
                <Grid.Col span={3}>{Math.round((v * 0.25) / 3)}</Grid.Col>
                <Grid.Col span={3}>{Math.round(v + v * 0.2)}</Grid.Col>
              </Grid>
            );
          })}
        {!(investment > 0) && (
          <Text mt={20} align="center">
            No investment amount found!
          </Text>
        )}
      </Container>
    </Modal>
  );
};

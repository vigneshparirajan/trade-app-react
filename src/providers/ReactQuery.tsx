import { QueryClient, QueryClientProvider } from 'react-query';

export const ReactQueryProvider = ({ children }: { children: any }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

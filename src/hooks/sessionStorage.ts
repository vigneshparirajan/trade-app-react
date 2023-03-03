import { useState } from 'react';

export const useSessionStorage = (keyName: any, defaultValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.sessionStorage.getItem(keyName);
			if (value) {
				return JSON.parse(value);
			} else {
				window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
				return defaultValue;
			}
		} catch (err) {
			return defaultValue;
		}
	});

	const setValue = (newValue: any) => {
		window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
		setStoredValue(newValue);
	};

	return [storedValue, setValue];
};

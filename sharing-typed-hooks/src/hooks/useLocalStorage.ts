import { useState } from "react"

const useLocalStorage = <T>(key: string, initialValue: T) => {
	const [storedValue, setStorageValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStorageValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(error);
		}
	}

	return [storedValue, setValue] as const;
}

export { useLocalStorage }
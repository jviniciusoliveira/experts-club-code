import { useEffect, useState } from "react";

const useMediaQuery = <T>(queries: string[], values: T[], defaultValue: T) => {
	const mediaQueryList = queries.map(query => window.matchMedia(query));

	const getValue = () => {
		const index = mediaQueryList.findIndex(mql => mql.matches);
		return values?.[index] || defaultValue;
	};

	const [value, setValue] = useState<T>(getValue);

	useEffect(() => {
		const handler = () => setValue(getValue);
		mediaQueryList.forEach(mql => mql.addListener(handler));

		return () => mediaQueryList.forEach(mql => mql.removeListener(handler));
	}, []);

	return value;
}

export { useMediaQuery }
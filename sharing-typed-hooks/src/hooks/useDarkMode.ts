import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage"
import { useMediaQuery } from "./useMediaQuery";

const useDarkMode = () => {
	const [enableState, setEnableState] = useLocalStorage<boolean>('dark-mode-enabled', false);

	const preferDarkmode = usePreferDarkmode();
	const enabled = enableState ?? preferDarkmode;

	useEffect(() => {
		const className = 'dark-mode';
		const element = window.document.body;

		if (enabled) {
			return element.classList.add(className);
		}
		return element.classList.remove(className);
	}, [enabled]);

	return [enabled, setEnableState];
}

const usePreferDarkmode = () => {
	return useMediaQuery<boolean>(['(prefers-color-schema: dark)'], [true], false);
}

export { useDarkMode }
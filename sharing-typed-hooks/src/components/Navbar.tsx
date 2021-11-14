import { useDarkMode } from "../hooks/useDarkMode"
import { Toggle } from "./Toggle"

const Navbar = () => {
	const [darkMode, setDarkMode] = useDarkMode();

	return (
		<div className="navbar">
			<Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
		</div>
	)
}

export { Navbar }
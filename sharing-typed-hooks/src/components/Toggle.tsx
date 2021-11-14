const Toggle = (props: any) => (
	<div className="dark-mode-toggle">
		<button
			type="button"
			onClick={() => props.setDarkMode(false)}
		>
			☀
		</button>
		<span className="toggle-control">
			<input
				type="checkbox"
				className="dmcheck"
				id="dmcheck"
				checked={props.darkMode}
				onChange={() => props.setDarkMode(!props.darkMode)}
			/>
			<label htmlFor="dmcheck" />
		</span>
		<button
			type="button"
			onClick={() => props.setDarkMode(true)}
		>
			🌘
		</button>
	</div>
)

export { Toggle }
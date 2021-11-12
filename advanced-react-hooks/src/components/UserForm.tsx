import { ReactNode, useEffect, useState, FormEvent } from "react";

interface HeaderProps {
	children: ReactNode
}

function Header({ children }: HeaderProps) {
	return (
		<nav className="container">
			<div>{children}</div>
		</nav>
	)
}

interface UserFormProps {
	userName: string;
	initialUserName?: string;
	onSubmit: (userName: string) => void;
}

export function UserForm({ userName: externalUserName, initialUserName = externalUserName, onSubmit }: UserFormProps) {
	const [userName, setUserName] = useState(initialUserName);

	useEffect(() => {
		if (typeof externalUserName === 'string') {
			setUserName(externalUserName)
		}
	}, [externalUserName])

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setUserName(event.currentTarget.value);
	}

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		onSubmit(userName);
	}

	return (
		<Header>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search by username.."
					value={userName}
					onChange={handleChange}
				/>

				<button
					type="submit"
					disabled={!userName.length}
				>
					Search
				</button>
			</form>
		</Header>
	)
}
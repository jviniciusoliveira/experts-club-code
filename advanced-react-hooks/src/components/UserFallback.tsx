interface UserFallbackProps {
	userName: string;
}

export function UserFallback({ userName }: UserFallbackProps) {
	return <p>buscando dados do usuario {userName}</p>
}
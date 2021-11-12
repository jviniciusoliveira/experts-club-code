import { UserInfo } from "./UserInfo";

interface UserSectionProps {
	onSelect: (userName: string) => void;
	userName: string;
}

export function UserSection({ onSelect, userName }: UserSectionProps) {
	return (
		<div>
			<UserInfo userName={userName} />
		</div>
	)
}
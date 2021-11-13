import { UserInfo } from "./UserInfo";

interface UserSectionProps {
	userName: string;
}

export function UserSection({ userName }: UserSectionProps) {
	return (
		<div className="box-container">
			<UserInfo userName={userName} />
		</div>
	)
}
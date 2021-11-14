import { useFetch, requestStatus } from '../hooks/useFetch';
import { UserFallback } from "./UserFallback";
import { UserView } from "./UserView";

interface UserInfoProps {
	userName: string;
}

type GithubUser = {
	name: string;
	bio: string;
	avatar_url: string;
}

export function UserInfo({ userName }: UserInfoProps) {
	const { status, data: user, error } = useFetch<GithubUser>(`https://api.github.com/users/${userName}`)

	switch (status) {
		case requestStatus.init:
			return <p>submit user</p>;

		case requestStatus.fetching:
			return <UserFallback userName={userName} />;

		case requestStatus.fetched:
			return <UserView user={user} />;

		case requestStatus.error:
			return <p>{error}</p>;

		default:
			return <p>Ops, something went wrong.</p>;
	}
}
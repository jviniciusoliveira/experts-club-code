import { useEffect } from "react";
import { REQUEST_STATUS, useRequestState } from "../hooks/useRequestState";
import { fetchGithubUser } from "../services/user";
import { UserFallback } from "./UserFallback";
import { UserView } from "./UserView";

interface UserInfoProps {
	userName: string;
}

export function UserInfo({ userName }: UserInfoProps) {
	const { data: user, error, status, run } = useRequestState({
		status: userName ? REQUEST_STATUS.PENDING : REQUEST_STATUS.IDLE
	});

	useEffect(() => {
		if (!userName) return;
		return run(fetchGithubUser(userName));
	}, [userName, run]);

	switch (status) {
		case REQUEST_STATUS.IDLE:
			return <p>submit user</p>;

		case REQUEST_STATUS.PENDING:
			return <UserFallback userName={userName} />;

		case REQUEST_STATUS.RESOLVED:
			return <UserView user={user} />;

		case REQUEST_STATUS.REJECTED:
			return <p>{error}</p>;

		default:
			return <p>Ops, something went wrong.</p>;
	}
}
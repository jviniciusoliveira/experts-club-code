import { useCallback, useEffect, useReducer, useState } from "react";
import { fetchGithubUser } from "../services/user";
import { UserFallback } from "./UserFallback";
import { UserView } from "./UserView";

interface UserInfoProps {
	userName: string;
}

const REQUEST_STATUS = {
	IDLE: 'idle',
	PENDING: 'pending',
	RESOLVED: 'resolved',
	REJECTED: 'rejected'
}

const asyncReducer = (state: any, action: any) => {
	switch (action.type) {
		case REQUEST_STATUS.PENDING:
			return {
				status: REQUEST_STATUS.PENDING,
				data: null,
				error: null
			};
		case REQUEST_STATUS.RESOLVED:
			return {
				status: REQUEST_STATUS.RESOLVED,
				data: action.data,
				error: null
			};
		case REQUEST_STATUS.REJECTED:
			return {
				status: REQUEST_STATUS.REJECTED,
				data: null,
				error: action.error
			};
		default:
			throw Error(`Unhandled action: ${action.type}`)
	}
}

const useAsync = (initialState: any) => {
	const [state, dispatch] = useReducer(asyncReducer, {
		status: REQUEST_STATUS.IDLE,
		data: null,
		error: null,
		...initialState
	});

	const run = useCallback((promise: Promise<void>) => {
		dispatch({ type: REQUEST_STATUS.PENDING });
		promise.then(
			data => {
				dispatch({ type: REQUEST_STATUS.RESOLVED, data });
			},
			error => {
				dispatch({ type: REQUEST_STATUS.REJECTED, error });
			}
		);
	}, []);

	return { ...state, run };
}

export function UserInfo({ userName }: UserInfoProps) {
	const { data: user, error, status, run } = useAsync({
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
			return <UserView user={user} />

		case REQUEST_STATUS.REJECTED:
			return <p>{error}</p>;

		default:
			return <p>Ops, something went wrong.</p>;
	}
}
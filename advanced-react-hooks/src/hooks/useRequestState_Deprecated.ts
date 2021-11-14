import { useCallback, useReducer } from "react";

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

const useRequestState = (initialState: any) => {
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

export { useRequestState, REQUEST_STATUS }
import { useEffect, useReducer } from "react";

enum requestType {
	request = 'request',
	success = 'success',
	failure = 'failure'
}

enum requestStatus {
	init = 'init',
	fetched = 'fetched',
	fetching = 'fetching',
	error = 'error'
}

interface State<T> {
	status: requestStatus;
	data?: T;
	error?: string;
}

type Action<T> =
	| { type: requestType.request }
	| { type: requestType.success, payload: T }
	| { type: requestType.failure, payload: string };

const useFetch = <T>(url: string): State<T> => {
	const initialState: State<T> = {
		status: requestStatus.init,
		data: undefined,
		error: undefined
	}

	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case requestType.request:
				return {
					...state,
					status: requestStatus.fetching
				};
			case requestType.success:
				return {
					...state,
					status: requestStatus.fetched,
					data: action.payload
				};
			case requestType.failure:
				return {
					...state,
					status: requestStatus.error,
					error: action.payload
				}
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {

		const fetchData = async () => {
			dispatch({ type: requestType.request });

			try {
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error('something went wrong');
				}

				const data = await response.json();
				dispatch({ type: requestType.success, payload: data });
			} catch (error: any) {
				dispatch({ type: requestType.failure, payload: error.message });
			}
		}

		fetchData();
	}, [url]);

	return state;
}

export {
	useFetch,
	requestStatus
}
import { useEffect, useReducer, useRef } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

enum requestType {
	request = 'request',
	success = 'success',
	failure = 'failure'
}

enum requestStatus {
	init = 'init',
	error = 'error',
	fetched = 'fetched',
	fetching = 'fetching'
}

interface State<T> {
	status: requestStatus;
	data?: T;
	error?: string;
}

interface Cache<T> {
	[url: string]: T;
}

type Action<T> =
	| { type: requestType.request }
	| { type: requestType.success, payload: T }
	| { type: requestType.failure, payload: string };

const useFetch = <T = unknown>(url?: string, options?: AxiosRequestConfig): State<T> => {
	const cache = useRef<Cache<T>>({});
	const cancelRequest = useRef<boolean>(false);

	const initialState: State<T> = {
		status: requestStatus.init,
		data: undefined,
		error: undefined
	};

	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case requestType.request:
				return {
					...initialState,
					status: requestStatus.fetching
				};
			case requestType.success:
				return {
					...initialState,
					data: action.payload,
					status: requestStatus.fetched
				};
			case requestType.failure:
				return {
					...initialState,
					error: action.payload,
					status: requestStatus.error
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {
		if (!url) return;

		const fetchData = async () => {
			dispatch({ type: requestType.request });

			if (cache.current[url]) {
				return dispatch({ type: requestType.success, payload: cache.current[url] });
			}

			try {
				const response = await axios(url, options);
				cache.current[url] = response.data;

				if (cancelRequest.current) return;

				dispatch({ type: requestType.success, payload: response.data });
			} catch (error: any) {
				if (cancelRequest.current) return;
				dispatch({ type: requestType.failure, payload: error.message });
			}
		}

		fetchData();

		return () => { cancelRequest.current = true };
	}, [url, options]);

	return state;
}

export {
	useFetch,
	requestType,
	requestStatus
}
const BASE_URL = "https://api.github.com/users";

type User = {
	name: string;
}

export const fetchGithubUser = (userName: string) => {
	return fetch(`${BASE_URL}/${userName}`)
		.then(response => {
			if (!response.ok) {
				return Promise.reject("User not fount");
			}
			return response.json();
		});
}
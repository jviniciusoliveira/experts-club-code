export function UserView({ user }: any) {
	return (
		<div className="user-view">
			<img src={user.avatar_url} />
			<strong>{user.name}</strong>
			<p>{user.bio}</p>
		</div>
	)
}
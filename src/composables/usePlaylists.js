export default async function usePlaylists (request, store) {
	let res = await request.get(`users/${store.state.user.account.uid}/playlists/list/`);
	return res.data.result;
}

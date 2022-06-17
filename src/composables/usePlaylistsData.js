export default async function usePlaylistsData (request, store, kinds) {
	let res = await request.post(`/users/${store.state.user.account.uid}/playlists?kinds=${kinds.toString()}`);
	return res.data.result;
}

export default async function usePlaylist(request, kind, uid) {
	if (!kind || !kind)
		return;
	
	let res = await request.get(`/users/${uid}/playlists/${kind}`);
	return res.data.result;
}

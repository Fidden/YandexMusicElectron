import { inject } from 'vue';

export default async function usePlaylist(kind, uid ) {
	if (!kind || !kind)
		return;
	
	const request = inject('$request');
	let res = await request.get(`/users/${uid}/playlists/${kind}`);
	return res.data.result;
}

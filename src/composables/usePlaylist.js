import { useStore } from 'vuex';
import { inject } from 'vue';

export default async function usePlaylist(kind, uid = null) {
	if (!kind)
		return;
	
	const store = useStore();
	if (!uid)
		uid = store.state.user.account.uid;
	
	const request = inject('$request');
	let res = await request.get(`/users/${uid}/playlists/${kind}`);
	return res.data.result;
}

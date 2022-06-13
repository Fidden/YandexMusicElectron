export default function (store, tracks) {
	store.dispatch('setShuffle', true);
	store.dispatch('setQueue', tracks);
	store.dispatch('setIsPlaying', false);
}

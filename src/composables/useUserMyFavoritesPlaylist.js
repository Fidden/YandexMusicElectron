import usePlaylist from './usePlaylist.js';

export default async function useUserMyFavoritesPlaylist(request, store) {
	let res = await usePlaylist(request, 3, store.getters.userId);
	res.title = 'Мне нравится';
	res.ogImage = 'music.yandex.ru/blocks/playlist-cover/playlist-cover_like.png';
	return res;
}

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage';
import PlaylistPage from '../pages/PlaylistPage';
import AlbumPage from '../pages/AlbumPage';
import StationPage from '../pages/StationPage.vue';
import TracksPage from '../pages/TracksPage.vue';
import ArtistsPage from '../pages/ArtistsPage.vue';
import ArtistPage from '../pages/ArtistPage.vue';
import PodcastsPage from '../pages/PodcastsPage.vue';
import AlbumsPage from '../pages/AlbumsPage.vue';
import NewReleasesPage from '../pages/NewReleasesPage.vue';
import HitsPage from '../pages/HitsPage.vue';
import ChartPage from '../pages/ChartPage.vue';
import ArtistTracksPage from '../pages/ArtistTracksPage.vue';
import RecentlyPlayedPage from '../pages/RecentlyPlayedPage.vue';
import SearchPage from '../pages/SearchPage.vue';
import PlaylistsPage from '../pages/PlaylistsPage.vue';

const router = createRouter({
	history: createWebHistory('/'),
	routes: [
		{
			path: '/',
			component: HomePage,
			name: 'home'
		},
		{
			path: '/station',
			component: StationPage,
			name: 'station'
		},
		{
			path: '/tracks',
			component: TracksPage,
			name: 'tracks'
		},
		{
			path: '/playlist/:kind',
			component: PlaylistPage,
			name: 'playlist',
		},
		{
			path: '/album/:id',
			component: AlbumPage,
			name: 'album'
		},
		{
			path: '/artists',
			component: ArtistsPage,
			name: 'artists',
		},
		{
			path: '/artist/:id',
			component: ArtistPage,
			name: 'artist',
		},
		{
			path: '/artist/:id/tracks',
			component: ArtistTracksPage,
			name: 'artist-tracks',
		},
		{
			path: '/podcasts',
			component: PodcastsPage,
			name: 'podcasts',
		},
		{
			path: '/albums',
			component: AlbumsPage,
			name: 'albums',
		},
		{
			path: '/playlists',
			component: PlaylistsPage,
			name: 'playlists',
		},
		{
			path: '/new-releases',
			component: NewReleasesPage,
			name: 'new-releases',
		},
		{
			path: '/hits',
			component: HitsPage,
			name: 'hits',
		},
		{
			path: '/chart',
			component: ChartPage,
			name: 'chart',
		},
		{
			path: '/recent',
			component: RecentlyPlayedPage,
			name: 'recent',
		},
		{
			path: '/search',
			component: SearchPage,
			name: 'search',
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		}
	]
});

export default router;

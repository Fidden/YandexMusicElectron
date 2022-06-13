import { createStore } from 'vuex';
import Player from './modules/Player';
import Track from './modules/Track';
import Playlists from './modules/Playlists';
import Releases from './modules/Releases';
import User from './modules/User';
import Chart from './modules/Chart';
import Stations from './modules/Stations.js';
import Artists from './modules/Artists.js';
import Page from './modules/Page.js';
import Search from './modules/Search.js';
import Rpc from './modules/Rpc.js';

export default new createStore({
	state: {
		app: {
			state: 0,
		}
	},
	mutations: {
		SET_APP_STATE(state, app_state) {
			state.app.state = app_state;
		},
	},
	actions: {
		setAppState({commit}, app_state) {
			commit('SET_APP_STATE', app_state);
		},
	},
	modules: {
		user: User,
		player: Player,
		track: Track,
		playlists: Playlists,
		releases: Releases,
		chart: Chart,
		stations: Stations,
		artists: Artists,
		page: Page,
		search: Search,
		rpc: Rpc,
	}
});

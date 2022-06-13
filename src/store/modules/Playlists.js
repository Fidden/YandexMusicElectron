export default {
	state: {
		all: [],
		last_played: [],
		hits: []
	},
	mutations: {
		SET_USER_PLAYLISTS(state, playlists) {
			state.all = playlists;
		},
		SET_LAST_PLAYED_PLAYLISTS(state, playlists) {
			state.last_played = playlists;
		},
		SET_HITS_PLAYLISTS(state, playlists) {
			state.hits = playlists;
		},
		SET_HIT_DATA(state, data) {
			state.hits[state.hits.findIndex(item => item.uid === data.uid && item.kind === data.kind)] = data;
		},
	},
	actions: {
		setPlaylists({commit}, playlists) {
			commit('SET_USER_PLAYLISTS', playlists);
		},
		setHitsPlaylists({commit}, playlists) {
			commit('SET_HITS_PLAYLISTS', playlists);
		},
		setLastPlayedPlaylist({commit}, playlists) {
			commit('SET_LAST_PLAYED_PLAYLISTS', playlists);
		},
		setHitData({commit}, data) {
			commit('SET_HIT_DATA', data);
		}
	},
	getters: {
		playLists(state) {
			return state.all.slice(0, 12);
		},
		firstHits(state) {
			return state.hits.slice(0, 20);
		}
	}
};

export default {
	state: {
		token: 'AQAAAABevSUfAAG8Xrt2CZAbxEvSnyBU4FXXcSY',
		account: null,
		tracks: []
	},
	mutations: {
		SET_USER(state, user) {
			state.account = user.account;
		},
		SET_USER_TRACKS(state, tracks) {
			state.tracks = tracks;
		}
	},
	actions: {
		setUser({commit}, user) {
			commit('SET_USER', user);
		},
		setUserTracks({commit}, tracks) {
			commit('SET_USER_TRACKS', tracks);
		}
	},
	getters: {
		userId(state) {
			return state.account.uid;
		}
	}
};

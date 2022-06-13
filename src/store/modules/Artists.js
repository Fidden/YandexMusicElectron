export default {
	state: {
		data: []
	},
	mutations: {
		SET_ARTISTS(state, value) {
			state.data = value;
		}
	},
	actions: {
		setArtists({commit}, value) {
			commit('SET_ARTISTS', value);
		}
	}
};

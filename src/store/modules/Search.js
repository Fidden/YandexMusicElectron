export default {
	state: {
		response: {},
	},
	mutations: {
		SET_SEARCH_RESPONSE(state, response) {
			state.response = response;
		}
	},
	actions: {
		setSearchResponse({commit}, response) {
			commit('SET_SEARCH_RESPONSE', response);
		}
	},
	getters: {
		getSearchTracks(state) {
			return state.response.tracks?.results.map(item => ({track: item}));
		}
	}
};

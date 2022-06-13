export default {
	state: {
		loaded: false,
		authorized: true,
	},
	mutations: {
		SET_LOADED(state, value) {
			state.loaded = value;
		},
		SET_AUTHORIZED(state, value) {
			state.authorized = value;
		}
	},
	actions: {
		setLoaded({commit}, value) {
			commit('SET_LOADED', value);
		},
		setAuthorized({commit}, value) {
			commit('SET_AUTHORIZED', value);
		}
	},
	getters: {
		pageIndex(state) {
			if (!state.authorized)
				return 0;
			else if (!state.loaded && state.authorized)
				return 1;
			else if (state.loaded && state.authorized)
				return 2;
			else
				return 3;
		}
	}
};

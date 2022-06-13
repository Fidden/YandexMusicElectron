export default {
	state: {
		new: [],
	},
	mutations: {
		SET_NEW_RELEASES(state, releases) {
			state.new = releases.map(item => {
				return {id: item};
			});
		},
		SET_RELEASE_DATA(state, data) {
			state.new[state.new.findIndex(item => item.id === data.id)] = data;
		}
	},
	actions: {
		setNewReleases({commit}, releases) {
			commit('SET_NEW_RELEASES', releases);
		},
		setNewReleaseData({commit}, data) {
			commit('SET_RELEASE_DATA', data);
		},
	},
	getters: {
		firstReleases(state) {
			return state.new.slice(0, 20);
		}
	}
};

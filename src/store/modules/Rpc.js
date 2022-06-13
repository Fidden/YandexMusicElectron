export default {
	state: {
		trackName: '',
		startTimestamp: new Date(),
	},
	mutations: {
		SET_RPC(state, trackName) {
			state.trackName = trackName;
			state.startTimestamp = new Date();
		}
	},
	actions: {
		setRpc({commit}, payload) {
			commit('SET_RPC', payload);
		}
	}
};

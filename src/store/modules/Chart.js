export default {
	state: {
		all: []
	},
	mutations: {
		SET_CHART(state, value) {
			state.all = value;
		}
	},
	actions: {
		setChart({commit}, value) {
			commit('SET_CHART', value);
		}
	},
	getters: {
		firstChartTracks(state) {
			return state.all.chart?.tracks.slice(0, 10);
		}
	}
};

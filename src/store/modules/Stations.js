export default {
	state: {
		dashboard: [],
		list: [],
		current: {
			name: '',
			batch_id: null,
		},
		isPlaying: false,
	},
	mutations: {
		SET_STATIONS_DASHBOARD(state, value) {
			state.dashboard = value;
		},
		SET_STATIONS_LIST(state, value) {
			state.list = value;
		},
		SET_IS_PLAYING(state, value) {
			state.isPlaying = value;
		},
		SET_CURRENT(state, value) {
			state.current.name = value;
		},
		SET_BATCH_ID(state, value) {
			state.current.batch_id = value;
		}
	},
	actions: {
		setStationsDashboard({commit}, value) {
			commit('SET_STATIONS_DASHBOARD', value);
		},
		setStationsList({commit}, value) {
			commit('SET_STATIONS_LIST', value);
		},
		setIsPlaying({commit}, value) {
			commit('SET_IS_PLAYING', value);
		},
		setCurrentStation({commit}, value) {
			commit('SET_CURRENT', value);
		},
		setCurrentStationBatchId({commit}, value) {
			commit('SET_BATCH_ID', value);
		}
	}
};

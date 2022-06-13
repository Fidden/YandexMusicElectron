export default {
	state: {
		shuffle: false,
		repeat: 0,
		track_index: -1,
		playing: false,
	},
	mutations: {
		SET_SHUFFLE(state, value) {
			state.shuffle = value;
		},
		SET_TRACK_INDEX(state, index) {
			state.track_index = index;
		},
		SET_PLAYING(state, value) {
			state.playing = value;
		},
		SET_REPEAT(state, value) {
			state.repeat = value;
		},
		INCREMENT_REPEAT(state) {
			state.repeat++;
		}
	},
	actions: {
		setShuffle({commit}, value) {
			commit('SET_SHUFFLE', value);
		},
		setTrackIndex({commit}, value) {
			commit('SET_TRACK_INDEX', value);
		},
		setPlaying({commit}, value) {
			commit('SET_PLAYING', value);
		},
		setRepeat({commit}, value) {
			commit('SET_REPEAT', value);
		},
		incrementRepeat({commit}) {
			commit('INCREMENT_REPEAT');
		}
	}
};

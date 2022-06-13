export default {
	state: {
		queue: [],
		played: [],
		recent: [],
	},
	mutations: {
		ADD_TRACK_TO_QUEUE(state, track) {
			state.queue.push(track);
		},
		ADD_TRACKS_TO_QUEUE(state, tracks) {
			state.queue = state.queue.concat(tracks);
		},
		SET_QUEUE(state, queue) {
			state.queue = queue;
		},
		REMOVE_FROM_QUEUE(state, q_item) {
			let index = state.queue.findIndex(item => item === q_item);
			if (index === -1)
				return;
			
			state.queue.splice(index, 1);
		},
		UNSHIFT_QUEUE(state, q_item) {
			state.queue.unshift(q_item);
		},
		ADD_TO_PLAYED(state, q_item) {
			state.played.push(q_item);
		},
		CLEAR_PLAYED_LIST(state) {
			state.played = [];
		},
		SET_RECENT(state, recent) {
			state.recent = recent;
		}
	},
	actions: {
		addTrackToQueue({commit}, track) {
			commit('ADD_TRACK_TO_QUEUE', track);
		},
		addTracksToQueue({commit}, tracks) {
			commit('ADD_TRACKS_TO_QUEUE', tracks);
		},
		setQueue({commit}, queue) {
			commit('SET_QUEUE', [].concat(queue));
		},
		removeFromQueue({commit}, q_item) {
			commit('REMOVE_FROM_QUEUE', q_item);
		},
		unshiftToQueue({commit}, q_item) {
			commit('UNSHIFT_QUEUE', q_item);
		},
		addToPlayed({commit}, q_item) {
			commit('ADD_TO_PLAYED', q_item);
		},
		clearPlayed({commit}) {
			commit('CLEAR_PLAYED_LIST');
		},
		setRecent({commit}, recent) {
			commit('SET_RECENT', recent);
		}
	}
};

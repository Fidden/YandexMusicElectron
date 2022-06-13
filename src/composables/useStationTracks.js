export default async function getStationTracks(store, request, settings = false, track_id_before = -1) {
	let params = track_id_before ? {'queue': track_id_before} : (settings ? {'settings2': 'true'} : false);
	
	let res = await request.get(`rotor/station/${store.state.stations.current.name}/tracks`, {
		data: params,
	});
	
	store.dispatch('setCurrentStationBatchId', res.data.result.batchId);
	
	return res.data.result.sequence;
}

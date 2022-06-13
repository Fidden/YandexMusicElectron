export default async function sendStationFeedback(store, request, type, total_played_seconds = null, batch_id = null, track_id = null) {
	let url = `rotor/station/${store.state.stations.current.name}/feedback?`;
	if (batch_id)
		url += `batch-id=${batch_id}`;
	
	let data = {
		type: type,
		timestamp: new Date().toISOString(),
		trackId: track_id,
		totalPlayedSeconds: total_played_seconds,
	};
	
	let dataFilled = Object.fromEntries(
		Object.entries(data)
			.filter(([, value]) => value != null)
	);
	
	
	let res = await request.post(url, dataFilled);
	
	return res.data.result === 'ok';
}

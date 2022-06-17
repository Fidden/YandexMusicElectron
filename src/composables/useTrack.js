export default async function (request, trackIds) {
	let params = new URLSearchParams();
	params.append('trackIds', trackIds.toString());
	
	let res = await request.post('/tracks', params, {
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	});
	
	return res.data.result.length === 1 ? res.data.result[0] : res.data.result;
}

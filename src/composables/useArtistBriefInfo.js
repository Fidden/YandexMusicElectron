export default async function useArtistBriefInfo(artis_id, request) {
	let res = await request.get(`/artists/${artis_id}/brief-info`);
	return res.data.result;
}

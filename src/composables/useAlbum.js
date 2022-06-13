export default async function useAlbum(request, id) {
	let res = await request.get(`/albums/${id}`);
	return res.data.result;
}

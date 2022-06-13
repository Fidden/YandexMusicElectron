/**
 * @param request
 * @param store
 * @param object_type
 * @param ids
 * @param remove
 * @returns {Promise<boolean>}
 */
export default async function useLikeAction(request, store, object_type, ids, remove = false) {
	let action = remove ? 'remove' : 'add-multiple';
	
	let params = new URLSearchParams();
	params.append(`${object_type}Ids`, ids);
	
	let res = await request.post(`/users/${store.state.user.account.uid}/likes/${object_type}s/${action}`, params, {
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	});
	
	//todo: сохранять ревизию и лайкнутые треки чтоб потом быстро обновлять а не загружать заново
	return object_type === 'track' ? remove ? false : res.data.result.revision > 0 : res.data.result === 'ok';
}

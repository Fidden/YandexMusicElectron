export default async function (request, track_id) {
	let res = await request.get(`tracks/${track_id}/download-info`);
	
	//загрузка данных xml
	let storage = await request.get(`${res.data.result[0].downloadInfoUrl}&format=json`);
	storage = storage.data;
	
	let sign = require('crypto')
		.createHash('md5')
		.update(`XGRlBW9FXlekgbPrRHuSiA${storage.path.slice(1)}${storage.s}`)
		.digest('hex');
	
	return `https://${storage.host}/get-mp3/${sign}/${storage.ts}${storage.path}`;
}

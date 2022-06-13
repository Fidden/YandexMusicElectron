import { inject } from 'vue';

export default async function useChart() {
	const request = inject('$request');
	let res = await request.get('/landing3/chart');
	return res.data.result;
}

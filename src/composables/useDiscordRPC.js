import RPC from 'discord-rpc';

export default function (store, clientId) {
	RPC.register(clientId);
	
	const client = new RPC.Client({transport: 'ipc'});
	
	function setActivity() {
		client.setActivity({
			details: store.state.rpc.trackName ? `Слушает: ${store.state.rpc.trackName}` : 'Ничего не слушает',
			startTimestamp: store.state.rpc.startTimestamp,
			largeImageKey: 'yandex-rpc',
		});
	}
	
	client.on('ready', () => {
		setActivity();
		
		setInterval(() => {
			setActivity();
		}, 15e3);
	});
	
	client.login({clientId});
}

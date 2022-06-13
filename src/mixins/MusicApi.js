export default {
	methods: {
		async getAccountInfo() {
			let res = await this.$request.get('account/status');
			return res.data.result;
		},
		async getPlaylists() {
			let res = await this.$request.get(`users/${this.$store.state.user.account.uid}/playlists/list/`);
			return res.data.result;
		},
		async getPlaylistData(kind, uid = null) {
			if (!kind)
				return;
			
			if (!uid)
				uid = this.$store.state.user.account.uid;
			
			let res = await this.$request.get(`/users/${uid}/playlists/${kind}`);
			return res.data.result;
		},
		async getUserPlaylistsData(kinds) {
			let res = await this.$request.post(`/users/${this.$store.state.user.account.uid}/playlists?kinds=${kinds.toString()}`);
			return res.data.result;
		},
		async getTracksByIds(track_ids) {
			let params = new URLSearchParams();
			params.append('trackIds', track_ids.toString());
			
			let res = await this.$request.post('/tracks', params, {
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			});
			
			return res.data.result;
		},
		async getNewReleases() {
			let res = await this.$request.get('/landing3/new-releases');
			return res.data.result.newReleases;
		},
		async getHitsPlaylists() {
			let res = await this.$request.get('/landing3/new-playlists');
			return res.data.result.newPlaylists;
		},
		async getAlbum(id) {
			let res = await this.$request.get(`/albums/${id}`);
			return res.data.result;
		},
		async getAlbumData(id) {
			let res = await this.$request.get(`/albums/${id}/with-tracks`);
			let album = res.data.result;
			
			album.volumes[0].forEach((item, index) => {
				album.volumes[0][index] = {track: item};
			});
			
			return album;
		},
		async getChart() {
			let res = await this.$request.get('/landing3/chart');
			return res.data.result;
		},
		async getHomepageData() {
			let res = await this.$request.get('https://api.music.yandex.net/landing3?blocks=personalplaylists%2Cpromotions%2Cnew-releases%2Cnew-playlists%2Cmixes%2Cchart%2Ccharts%2Cartists%2Calbums%2Cplaylists%2Cplay_contexts%2Cpodcasts');
			return res.data.result;
		},
		async getStationsDashboard() {
			let res = await this.$request.get('/rotor/stations/dashboard');
			return res.data.result;
		},
		async getStationsList() {
			let res = await this.$request.get('/rotor/stations/list');
			return res.data.result;
		},
		async getUserTracks(track_ids, with_positions = false) {
			let res = await this.$request.post('/tracks', {
				'track-ids': track_ids,
				'with-positions': with_positions,
			});
			return res.data.result;
		},
		async setStationSettings(station, mood_energy, diversity, _type) {
			let res = await this.$request.post(`/rotor/station/${station}/settings3`, {
				moodEnergy: mood_energy,
				diversity: diversity,
				type: _type,
			});
			
			return res.data.result;
		},
		async getStationTracks(settings = false, track_id_before = -1) {
			let params = track_id_before ? {'queue': track_id_before} : (settings ? {'settings2': 'true'} : false);
			
			let res = await this.$request.get(`rotor/station/${this.$store.state.stations.current.name}/tracks`, {
				data: params,
			});
			
			this.$store.dispatch('setCurrentStationBatchId', res.data.result.batchId);
			
			return res.data.result.sequence;
		},
		async getTrackDirectLink(track_id) {
			//получение листа возможных битрейтов и типов трека
			let res = await this.$request.get(`tracks/${track_id}/download-info`, {
				headers: {
					'Authorization': `OAuth ${localStorage.getItem('token')}`,
				}
			});
			
			//загрузка данных xml
			let storage = await this.$request.get(`${res.data.result[0].downloadInfoUrl}&format=json`);
			storage = storage.data;
			
			let sign = require('crypto')
				.createHash('md5')
				.update(`XGRlBW9FXlekgbPrRHuSiA${storage.path.slice(1)}${storage.s}`)
				.digest('hex');
			
			return `https://${storage.host}/get-mp3/${sign}/${storage.ts}${storage.path}`;
		},
		async sendStationFeedback(type, total_played_seconds = null, batch_id = null, track_id = null) {
			let url = `rotor/station/${this.$store.state.stations.current.name}/feedback?`;
			if (batch_id)
				url += `batch-id=${batch_id}`;
			
			let data = {
				type: type,
				timestamp: new Date().toISOString(),
				trackId: track_id,
				totalPlayedSeconds: total_played_seconds,
			};
			
			let dataFilled = Object.fromEntries(Object.entries(data).filter(([, value]) => value != null));
			
			
			let res = await this.$request.post(url,
				dataFilled);
			
			return res.data.result === 'ok';
		},
		async searchData(text, nocorrect = false, type_ = 'all', page = 0, playlist_in_best = false,) {
			let res = this.$request.get('/search', {
				params: {
					text: text,
					nocorrect: String(nocorrect),
					type: type_,
					page: page,
					'playlist-in-best': playlist_in_best,
				}
			});
			
			return res.data.result;
		},
		async getArtists() {
			let res = await this.$request.get(`/users/${this.$store.state.user.account.uid}/likes/artists`);
			return res.data.result;
		},
		async getArtistBriefInfo(artis_id) {
			let res = await this.$request.get(`/artists/${artis_id}/brief-info`);
			return res.data.result;
		}
	}
};

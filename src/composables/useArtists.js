export default function useArtists(artists) {
	return artists.map(item => item.name).toString().replace(',', ', ');
}

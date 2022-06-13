export default function useArtistName(artist, index, length) {
	if (length > 1)
		return (length === index + 1 ? artist.name : `${artist.name}, `);
	else
		return artist.name;
}

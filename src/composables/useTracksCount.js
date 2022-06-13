export default function useTracksCount(item) {
	if (item.trackCount > 1)
		return `${item.trackCount} треков`;
	else
		return `${item.trackCount} трек`;
}

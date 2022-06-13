export default function useImage(item, size = '100x100') {
	let image = null;
	
	if (item?.ogImage)
		image = item.ogImage;
	else if (item?.imageUrl)
		image = item.imageUrl;
	else if (item?.coverUri)
		image = item.coverUri;
	else if (item.cover?.uri)
		image = item.cover.uri;
	else if (item?.cover?.itemsUri)
		image = item.cover.itemsUri[0];
	
	return image ? `https://${image.replace('%%', size)}` : '';
}

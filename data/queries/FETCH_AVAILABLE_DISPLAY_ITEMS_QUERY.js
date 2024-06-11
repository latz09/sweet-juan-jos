export const FETCH_AVAILABLE_DISPLAY_ITEMS_QUERY = `
*[_type == 'availableDisplayItems'] {
  inventoryID,
  "imageUrl": image.asset->url,
  quantity,
  sizes,
  available
}
`;

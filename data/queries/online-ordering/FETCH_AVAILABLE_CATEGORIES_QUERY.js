export const FETCH_AVAILABLE_CATEGORIES_QUERY = `
*[_type == "productCategory" && available == true] | order(title asc){
  _id,
  title,
  slug
}
`;

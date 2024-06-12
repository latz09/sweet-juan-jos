export const FETCH_CONTACT_PAGE_QUERY = `
*[_type == 'contactPage' && isActive == true] {
  isActive,
  "landingImage": landingImage.asset->url,
  heading,
  introduction,
}
`;
export const FETCH_SPECIAL_EVENTS_PAGE_QUERY = `
*[_type == 'specialEventsPage' && isActive == true] {
  isActive,
  "landingImage": landingImage.asset->url,
  landingHeading,
  landingSlogan,
}
`;

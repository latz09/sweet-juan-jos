export const FETCH_CANDY_AND_TREATS_PAGE_QUERY = `
*[_type == 'treatsPage' && isActive == true] {
  isActive,
  "landingImage": landingImage.asset->url,
  landingHeading,
  landingSlogan,
  candyOptions,
  "bannerImages": bannerImages[].asset->{
    "url": url,
  },

}
`;

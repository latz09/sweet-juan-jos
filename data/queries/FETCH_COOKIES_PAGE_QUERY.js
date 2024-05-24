export const FETCH_COOKIES_PAGE_QUERY = `
*[_type == 'cookiesPage' && isActive == true] {
  isActive,
  landingHeading,
  landingSlogan,
  "landingImage": landingImage.asset->url,  

  "bannerImages": bannerImages[].asset->{
    "url": url,
  },
  cookieOptions,
  specialtyCookieFlavors,

 
}
`;
 
export const FETCH_CUPCAKE_PAGE_QUERY = `
*[_type == 'cupcakesPage' && isActive == true] {
  isActive,
  landingHeading,
  landingSlogan,
  "landingImage": landingImage.asset->url,
  cakeFlavors,
  frostingFlavors,  
  smallCakeSizes,
  "bannerImages": bannerImages[].asset->{
    "url": url,
  },
  cupcakePrice
 
}
`;

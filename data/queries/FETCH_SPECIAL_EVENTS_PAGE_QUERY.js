export const FETCH_SPECIAL_EVENTS_PAGE_QUERY = `
*[_type == 'specialEventsPage' && isActive == true] {
  isActive,
  "landingImage": landingImage.asset->url,
  landingHeading,
  landingSlogan,
  introductionSection {
    heading,
    openingParagraph,
    "introImageUrl": introImage.asset->url
  },
  "bannerImages1": bannerImages1[].asset->{
    "url": url,
  },
    weddingMenuLinks[] {
    title,
    link,
    "imageUrl": image.asset->url
  },
   "bannerImages2": bannerImages2[].asset->{
    "url": url,
  },
    "availableDisplayItemsImage": availableDisplayItemsImage.asset->url,
    displayItemsLink {
    heading,
    subHeading,
    "availableDisplayItemsImage": availableDisplayItemsImage.asset->url
  },
  
 
}
`;

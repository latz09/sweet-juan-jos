export const FETCH_PAGE_QUERY = `
*[_type == 'home' && isActive == true] {
  isActive,
  landingSlogan,
  "landingImage": landingImage.asset->url,
  intro,
  servicePhotoLinks[] {
    title,
    link,
    "imageUrl": image.asset->url
  },
  specialEventShoutOut {
    heading,
    subheading,
    "eventImageUrl": image.asset->url
  },
  about {
    heading,
    "aboutImage": aboutImage.asset->url,
    paragraph1,
    paragraph2
  },
  "reviewsImage": reviewsImage.asset->url,
  reviews[] {
    review,
    author
  }
}
`;

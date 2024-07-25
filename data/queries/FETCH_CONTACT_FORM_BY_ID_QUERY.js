export const FETCH_CONTACT_FORM_BY_ID_QUERY = `
  *[_type == "contactForm" && _id == $id][0] {
    _id,
    name,
    email,
    phoneNumber,
    eventDate,
    amount,
    interests,
    "inspirationPhotos": inspirationPhotos[].asset->url,
    additionalDetails,
    sentAt,
    CMSOwneradditionalDetails,
    selectedDisplayItems[]->,
    status
  }
`;

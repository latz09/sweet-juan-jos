export const FETCH_ALL_CONTACT_FORMS_QUERY = `
  *[_type == "contactForm" && !(_id in path("drafts.**"))] | order(sentAt desc) {
    _id,
    name,
    email,
    phoneNumber,
    eventDate,
    sentAt,
    status
  }
`;

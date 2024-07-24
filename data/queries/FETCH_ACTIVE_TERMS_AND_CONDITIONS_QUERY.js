export const FETCH_ACTIVE_TERMS_AND_CONDITIONS_QUERY = `
*[_type == 'termsAndConditions' && isActive == true] {
  "logoUrl": logo.asset->url,
  intro,
  terms[] {
    title,
    description
  }
}
`;
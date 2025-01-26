export const FETCH_AUTOMATIC_EMAIL_CONTENT_QUERY = `
  *[_type == "promotions" && slug.current == $slug && active == true][0]{
    automaticEmailContent[]
  }
`;
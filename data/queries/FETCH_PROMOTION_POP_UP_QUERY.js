export const FETCH_PROMOTION_POP_UP_QUERY = `
  *[_type == "promotions"  && active == true][0]{
        active,  
        title,
        subtitle,
        slug,
        "landingPageImage": landingPageImage.asset->url,
         timeline
            {
                endDate
            },
    
    }
`;
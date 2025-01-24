

export const FETCH_PROMOTION_QUERY = `
  *[_type == "promotions" && slug.current == $slug && active == true][0]{
    title,
    subtitle,
    slug,
    active,
    timeline{
      startDate,
      endDate
    },
    delivery{
      enabled,
      details
    },
    pickup{
      enabled,
      details
    },
    offerings[]{
      title,
      subtitle,
      "groupImageUrl": groupImage.asset->url,
      cost,
      items[]{
        itemTitle,
        itemDescription,
        "itemImageUrl": itemImage.asset->url,
        buyNowLink
      }
    }
  }
`;

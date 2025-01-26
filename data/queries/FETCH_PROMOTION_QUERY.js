

export const FETCH_PROMOTION_QUERY = `
  *[_type == "promotions" && slug.current == $slug && active == true][0]{
    title,
    subtitle,
    slug,
    "landingPageImage": landingPageImage.asset->url,
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
    giftOption,
    offerings[]{
      title,
      subtitle,
      "groupImageUrl": groupImage.asset->url,
      
      items[]{
        itemTitle,
        itemDescription,
        itemCost,
        "itemImageUrl": itemImage.asset->url,
        buyNowLink
      }
    }
  }
`;

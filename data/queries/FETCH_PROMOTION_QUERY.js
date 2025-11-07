

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
      details,
      dateTimeSlots[]{
        date,
        timeSlots[]{
          timeSlot
        }
      }
    },
    pickup{
      enabled,
      details,
      dateTimeSlots[]{
        date,
        timeSlots[]{
          timeSlot
        }
      }
    },
    giftOption,
    autoResponseEmail {
      emailContent,
      pickupDetailsLine,
      deliveryDetailsLine
    },
    offerings[]{
      title,
      subtitle,
      "groupImageUrl": groupImage.asset->url,
      
      items[]{
        itemTitle,
        itemSubtitle,
        itemDescription,
        itemCost,
        "itemImageUrl": itemImage.asset->url,
        buyNowLink
      }
    }
  }
`;



export const FETCH_AUTORESPONSE_EMAIL_QUERY = `
  *[_type == "promotions" && slug.current == $slug][0]{
    autoResponseEmail {
      emailContent,
      pickupDetailsLine,
      deliveryDetailsLine
    }
  }
`;


export const FETCH_PROMOTION_STAGING_QUERY = `
  *[_type == "promotions" && slug.current == $slug && staging == true][0]{
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
      details,
      dateTimeSlots[]{
        date,
        timeSlots[]{
          timeSlot
        }
      }
    },
    pickup{
      enabled,
      details,
      dateTimeSlots[]{
        date,
        timeSlots[]{
          timeSlot
        }
      }
    },
    giftOption,
    autoResponseEmail {
      emailContent,
      pickupDetailsLine,
      deliveryDetailsLine
    },
    offerings[]{
      title,
      subtitle,
      "groupImageUrl": groupImage.asset->url,
      
      items[]{
        itemTitle,
        itemSubtitle,
        itemDescription,
        itemCost,
        "itemImageUrl": itemImage.asset->url,
        buyNowLink
      }
    }
  }
`;
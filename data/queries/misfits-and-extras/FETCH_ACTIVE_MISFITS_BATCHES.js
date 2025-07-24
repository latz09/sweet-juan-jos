export const FETCH_ACTIVE_MISFITS_BATCHES = `
  *[_type == "misfitsBatch" && isActive == true] | order(createdAt desc) {
    _id,
    title,
    itemTitle,
    description,
    photo {
      asset -> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      hotspot,
      crop
    },
    totalQuantity,
    soldQuantity,
    quantityOptions[] {
      quantity,
      totalPrice
    },
    buyAllOption {
      enabled,
      totalPrice
    },
    isActive,
    expiresAt,
    createdAt
  }
`
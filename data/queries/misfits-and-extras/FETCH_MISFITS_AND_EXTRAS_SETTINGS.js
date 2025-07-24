export const FETCH_MISFITS_AND_EXTRAS_SETTINGS = `
  *[_type == "misfitsSettings"][0] {
    _id,
    acceptingOrders,
    heroImage {
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
    pageTitle,
    introText,
    allowPickup,
    allowDelivery,
    deliveryFee,
    pickupInfo,
    deliveryInfo,
    confirmationSubject,
    confirmationBody
  }
`
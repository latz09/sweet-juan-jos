export const FETCH_ONLINE_ORDERING_SETTINGS_QUERY = `
*[_type == "onlineOrderingSettings"][0]{
  acceptingOrders,
  heroImage {
    asset -> {
      url
    }
  },
  pageTitle,
  introText,
  allowPickup,
  allowDelivery,
  pickupInfo,
  deliveryInfo,
  allowGifting,
  confirmationSubject,
  confirmationBody,
  onlineOrderingActive,
  orderButtonText,
  optionalNotice,
availableProducts[] -> {
  _id,
  name,
  slug,
  basePrice,
  quantityOptions,
  flavorOptions[] -> {
    _id,
    name,
    upcharge
  },
  frostingOptions[] -> {
    _id,
    name,
    upcharge
  },
  image {
    asset -> {
      url
    }
  },
  description,
  category -> {
    _id,
    title
  },
  available
}

}
`;

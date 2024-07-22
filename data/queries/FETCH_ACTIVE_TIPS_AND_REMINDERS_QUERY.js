export const FETCH_ACTIVE_TIPS_AND_REMINDERS_QUERY = `
*[_type == 'tipsAndReminders' && isActive == true] {
  "logoUrl": logo.asset->url,
  introduction,
  choosingDesserts[] {
    title,
    description
  },
  choosingFlavors {
    flavorSuggestion[] {
      cupcakeQuantity,
      numberOfFlavors
    }
  },
  choosingTableSize {
    tableSuggestion[] {
      orderQuantity,
      tableSize
    }
  },
  delivery {
    details
  },
  additionalInformation[] {
    title,
    description
  }
}
`;

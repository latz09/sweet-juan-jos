export const FETCH_ONLINE_ORDERING_QUERY = `
  *[_type == "onlineOrdering"] {
    title,
    acceptingOrders,
    
  }
`;
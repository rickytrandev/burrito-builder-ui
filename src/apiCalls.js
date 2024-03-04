export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
    .then((response) => response.json());
};

export function postOrders(newOrder) {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: 'POST', 
    headers: { "Content-Type" : "application/json" },
    body: JSON.stringify(newOrder)
  })
}
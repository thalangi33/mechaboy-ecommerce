// Checkout products
const checkout = async (token: string, orderItems: any) => {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token, orderItems: orderItems }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error);
  }

  console.log(json);

  return json;
};

const shoppingCartService = {
  checkout,
};

export default shoppingCartService;

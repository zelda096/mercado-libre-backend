const axios = require("axios");


let categories = [];
async function getAllItems(query) {
  const response = await axios.get(
    `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
  );
   categories =
    response.data.filters
      .find((filter) => filter.id === "category")
      ?.values[0]?.path_from_root.map((cat) => cat.name) || [];
  const items = response.data.results.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: Math.floor(item.price),
      decimals: Math.round((item.price - Math.floor(item.price)) * 100),
    },
    picture: item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
  }));
  return { categories, items };
}

async function getItemById(id) {
  const [itemResponse, descriptionResponse] = await Promise.all([
    axios.get(`https://api.mercadolibre.com/items/${id}`),
    axios.get(`https://api.mercadolibre.com/items/${id}/description`),
  ]);
  
  const item = {
    id: itemResponse.data.id,
    title: itemResponse.data.title,
    price: {
      currency: itemResponse.data.currency_id,
      amount: Math.floor(itemResponse.data.price),
      decimals: Math.round(
        (itemResponse.data.price - Math.floor(itemResponse.data.price)) * 100
      ),
    },
    picture: itemResponse.data.pictures[0].url,
    condition: itemResponse.data.condition,
    free_shipping: itemResponse.data.shipping.free_shipping,
    sold_quantity: itemResponse.data.sold_quantity,
    description: descriptionResponse.data.plain_text,
  };
 
  return {item, categories};
}

module.exports = { getAllItems, getItemById };

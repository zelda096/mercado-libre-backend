const { getAllItems, getItemById } = require("../services/itemService");
const author = {
  name: "Miguel",
  lastname: "Salazar",
};

async function getItems(req, res) {
  try {
    const { categories, items } = await getAllItems(req.query.q)
    res.json({ author, categories, items })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

async function getItem(req, res) {
  try {
    const item = await getItemById(req.params.id)
    res.json({ author, item });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getItems, getItem };

export default async function handler(req, res) {
  try {
    const r = await fetch('https://fakestoreapi.com/products/categories');
    const text = await r.text();
    res.status(200).send(text); // no uses .json()
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
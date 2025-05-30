export default async function handler(req, res) {
  try {
    const response = await fetch('http://20.193.149.47:2242/salons/service/');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
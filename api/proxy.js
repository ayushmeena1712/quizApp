import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const apiResponse = await fetch('https://api.jsonserve.com/Uw5CrX');
    const data = await apiResponse.json();
    
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz data' });
  }
};
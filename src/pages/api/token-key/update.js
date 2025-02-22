import connectToDatabase from '../../../lib/mongodb';
import TokenKey from '../../../models/TokenKey';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      const { TokenKey: tokenKey } = req.body;

      if (!tokenKey) {
        return res.status(400).json({ success: false, message: 'TokenKey is required' });
      }

      const updatedTokenKey = await TokenKey.findOneAndUpdate(
        {}, 
        { TokenKey: tokenKey }, 
        { new: true, upsert: true }
      );

      return res.status(200).json({ success: true, data: updatedTokenKey });
    } catch (error) {
      console.error('Error handling TokenKey:', error);
      return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

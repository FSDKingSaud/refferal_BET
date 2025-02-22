import connectToDatabase from '../../../lib/mongodb';
import TokenKey from '../../../models/TokenKey';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const tokenKeyDocument = await TokenKey.findOne();

      if (!tokenKeyDocument) {
        return res.status(404).json({ success: false, message: 'No TokenKey document found' });
      }

      return res.status(200).json({
        success: true,
        data: { TokenKey: tokenKeyDocument.TokenKey },
      });
    } catch (error) {
      console.error('Error retrieving TokenKey:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}

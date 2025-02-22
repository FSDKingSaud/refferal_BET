import connectToDatabase from '../../../lib/mongodb';
import QrCode from '../../../models/QrCode';

export async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const qrCodes = await QrCode.find({}).lean();

      return res.status(200).json(qrCodes);
    } catch (error) {
      console.error('Error fetching QR codes:', error);
      return res.status(500).json({ message: 'Failed to fetch QR codes' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;

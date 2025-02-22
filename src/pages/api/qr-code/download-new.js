import connectToDatabase from '../../../lib/mongodb';
import QrCode from '../../../models/QrCode';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const qrCodes = await QrCode.find({ printed: false }).lean();

      if (!qrCodes.length) {
        return res.status(404).json({ message: 'No QR codes with printed: false found' });
      }

      const ids = qrCodes.map((qr) => qr._id);
      await QrCode.updateMany({ _id: { $in: ids } }, { $set: { printed: true } });

      return res.status(200).json({
        message: 'QR codes fetched and printed column updated to null',
        data: qrCodes,
      });
    } catch (error) {
      console.error('Error fetching and updating QR codes:', error);
      return res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

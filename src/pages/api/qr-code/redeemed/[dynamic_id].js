import connectToDatabase from '../../../../lib/mongodb';
import QrCode from '../../../../models/QrCode';

export default async function handler(req, res) {
  const { dynamic_id } = req.query;

  if (req.method === 'GET') {
    try {
      await connectToDatabase();

      const qrCode = await QrCode.findOne({ dynamicId: dynamic_id });

      if (!qrCode) {
        return res
          .status(404)
          .json({ message: 'QR code not found', success: false });
      }

      if (qrCode.redeemed) {
        return res.json({
          message: 'QR code already redeemed',
          success: false,
        });
      }

      qrCode.redeemed = true;
      await qrCode.save();

      return res.json({
        message: 'QR code successfully redeemed',
        success: true,
      });
    } catch (error) {
      console.error('Error redeeming QR code:', error);
      return res
        .status(500)
        .json({ message: 'Server error', success: false });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

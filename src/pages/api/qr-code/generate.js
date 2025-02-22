import QRCode from 'qrcode';
import connectToDatabase from '../../../lib/mongodb';
import QrCode from '../../../models/QrCode';

export async function handler(req, res) {
  if (req.method === 'GET') {
    const numOfQrCodes = req.query.numOfQrCodes;

    if (!numOfQrCodes || isNaN(numOfQrCodes)) {
      return res.status(400).json({ message: 'Missing or invalid "numOfQrCodes" query parameter' });
    }

    const numQRCodes = Number(numOfQrCodes);

    await connectToDatabase();

    const qrCodes = await Promise.all(
      Array.from({ length: numQRCodes }, async () => {
        const dynamicId = generateDynamicId();
        const qrUrl = `https://bet-token-saud-khans-projects-4ead3ce5.vercel.app/qr-code/${dynamicId}`;
        try {
          const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);

          const qrCode = new QrCode({
            dynamicId, 
            qrUrl,
            qrCodeDataUrl,
            redeemed: false, 
            printed: false, 
          });
          await qrCode.save();

          return { dynamicId, qrUrl, qrCodeDataUrl };
        } catch (error) {
          console.error(`Failed to generate QR code for ID: ${dynamicId}`, error);
          return null;
        }
      })
    );

    const validQrCodes = qrCodes.filter((qr) => qr !== null);

    return res.status(200).json(validQrCodes);
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function generateDynamicId() {
  const now = new Date();
  const timestamp = now.getTime().toString();
  const randomPart = Math.random().toString(36).substring(2, 34);
  return timestamp + randomPart.toUpperCase();
}

export default handler;

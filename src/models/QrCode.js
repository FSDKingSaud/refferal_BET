import mongoose from 'mongoose';

const QrCodeSchema = new mongoose.Schema({
  dynamicId: { type: String, required: true, unique: true },
  qrUrl: { type: String, required: true },
  qrCodeDataUrl: { type: String, required: true },
  redeemed: { type: Boolean, default: false },
  printed: { type: Boolean, default: false }, 
});

const QrCode = mongoose.models.QrCode || mongoose.model('QrCode', QrCodeSchema);

export default QrCode;

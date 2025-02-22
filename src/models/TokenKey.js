import mongoose from 'mongoose';

const TokenKeySchema = new mongoose.Schema({
  TokenKey: { type: String, required: true },
});

const TokenKey = mongoose.models.TokenKey || mongoose.model('TokenKey', TokenKeySchema);

export default TokenKey;

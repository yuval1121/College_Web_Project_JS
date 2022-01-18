import mongoose from 'mongoose';
import config from 'config';
const db: string = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err: unknown) {
    console.error(err);
    process.exit(1);
  }
};

export { connectDB };

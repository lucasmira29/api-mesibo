import dotenv from 'dotenv';

dotenv.config();

export const mesiboConfig = {
  token: process.env.MESIBO_TOKEN,
};

import axios from 'axios';
import { mesiboConfig } from '../config/mesiboConfig.js';


export const generateUserAcessToken = async (userAddress, appId, expiry = 525600) => {
  const body = {
    op: "useradd",
    token: mesiboConfig.token,
    user: {
      address: userAddress,

      token: {
        appid: appId,
        expiry: expiry
      }
    }
  };

  try {
    const response = await axios.post("https://api.mesibo.com/backend/", body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error generating User Acess Token', error.message);
    throw error;
  }
};
import express from 'express';
import MesiboController from '../controllers/mesiboController.js';

const router = express.Router();

router.post('/generate-token', (req, res) => MesiboController.createUserToken(req, res));


export default router;

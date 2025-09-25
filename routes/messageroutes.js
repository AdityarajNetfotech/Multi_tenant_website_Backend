import express from 'express';
import {addMessage} from "../controllers/messagecontroller.js"

const messageRouter = express.Router();

messageRouter.post('/addmessage', addMessage);

export default messageRouter;   

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

export const authGoogle = express.Router()


import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../configs/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não encontrado ou inválido.' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.user = { id: decoded.id };

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token não encontrado ou inválido.' });
  }
};

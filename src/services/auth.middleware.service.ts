import jwt from 'express-jwt';

const getTokenFromHeaders = (req: any) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const authMiddlewareService = {
  required: jwt({
    secret: 'secret',
    userProperty: 'user',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'user',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};
export { authMiddlewareService };

import express from 'express';

import { fetch } from 'undici';

import pkg from 'express-openid-connect';
const { auth } = pkg;

const router = express.Router();

router.use(auth({
  authorizationParams: {
    response_type: 'code',
    audience: 'https://api',
    scope: 'openid profile email read:hardware',
    prompt: 'consent'
  }
}));

router.get('/hardware', async (req, res) => {
  const { access_token, token_type } = req.oidc.accessToken;

  const url = `${process.env.API_DOMAIN}/api/v1/hardware`;
  const options = {
    headers: {
      'Authorization': `${token_type} ${access_token}`
    }
  };

  const response = await fetch(url, options);
  const result   = await response.json();

  res.status(200).json(result);
});

export { router };

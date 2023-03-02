import express from 'express';

import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const router = express.Router();

router.use(auth({
  authRequired: false,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
}));

router.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();

  next();
});

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/hardware', (req, res) => {
  const { access_token, token_type } = req.oidc.accessToken;

  const url = 'https://starfish-app-amrfh.ondigitalocean.app/api/v1/hardware';
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `${token_type} ${access_token}`,
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(url, options);
  const result   = await response.json();
  
  res.status(200).json(result);
});

export { router }

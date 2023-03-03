import express from 'express';

import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const router = express.Router();

router.use(auth({
  authRequired: false,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email read:hardware create:hardware'
  }
}));

router.use((req, res, next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();

  next();
});

router.get('/', async (req, res) => {
  const url = 'https://starfish-app-amrfh.ondigitalocean.app/api/v1/hardware';

  const response = await fetch(url);
  const result   = await response.json();
  
  res.locals.hardware = result;

  res.status(200).render('index');
});

router.get('/gallery', (req, res) => {
  res.status(200).render('gallery');
});

router.get('/judging', (req, res) => {
  res.status(200).render('judging');
});

router.get('/past_events', (req, res) => {
  res.status(200).render('past_events');
});

export { router }

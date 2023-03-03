import express from 'express';
import cors from 'cors';
import pkg from 'express-openid-connect';
const { auth, requiresAuth } = pkg;

const router = express.Router();

router.use(cors());

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

router.get('/', (req, res) => {
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

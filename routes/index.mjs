import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).render('welcomePage');
});

router.get('/gallery', async (req, res) => {
  res.status(200).render('gallery');
});

router.get('/judgingCriteria', async (req, res) => {
  res.status(200).render('judgingCriteria');
});

router.get('/pastEvents', async (req, res) => {
  res.status(200).render('pastEvents');
});
router.get('/sponsor', async (req, res) => {
  res.status(200).render('sponsor');
});
router.get('/dashboard', async (req, res) => {
  res.status(200).render('dashboard');
});


// ---- DASHBOARD FUNCTIONALITY

router.get('/dashboard/event_applications', async (req, res) => {
  const url = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-93c2815b-d2e8-4fba-bf30-c6d0b1d4e791/event_applications/listEventApplications';

  const response = await fetch(url);
  const result   = await response.json();

  res.locals.application = result.data;

  res.status(200).render('event_applications');
});


router.get('/dashboard/hardware', async (req, res) => {
  const url = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-93c2815b-d2e8-4fba-bf30-c6d0b1d4e791/hardware/listHardwareItems';
  const response = await fetch(url);
  const result   = await response.json();
  res.locals.data = result.data;
  res.status(200).render('hardware');
});

router.post('/dashboard/hardware', async (req, res) => {
  const { name, link, category, status, location } = req.body;
  const url = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-93c2815b-d2e8-4fba-bf30-c6d0b1d4e791/hardware/createHardwareItem';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name, link, category, status, location
    })
  };
  const response = await fetch(url, options);
  res.redirect('/dashboard/hardware');
});

export { router };

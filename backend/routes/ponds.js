// backend/routes/ponds.js

const router = require('express').Router();
const Pond = require('../models/pond.model');

// Get all ponds
router.route('/').get((req, res) => {
  Pond.find()
    .then(ponds => res.json(ponds))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a pond
router.route('/add').post((req, res) => {
  const { pondId, i1, i2 } = req.body;

  const newPond = new Pond({ pondId, i1, i2 });

  newPond.save()
    .then(() => res.json('Pond added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific pond by pondId
router.route('/:pondId').get((req, res) => {
  Pond.findOne({ pondId: req.params.pondId })
    .then(pond => res.json(pond))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a specific pond by pondId
router.route('/update/:pondId').post((req, res) => {
  Pond.findOne({ pondId: req.params.pondId })
    .then(pond => {
      pond.i1 = req.body.i1;
      pond.i2 = req.body.i2;
      pond.updatedAt = Date.now();

      pond.save()
        .then(() => res.json('Pond updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a specific pond by pondId
router.route('/:pondId').delete((req, res) => {
  Pond.findOneAndDelete({ pondId: req.params.pondId })
    .then(() => res.json('Pond deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

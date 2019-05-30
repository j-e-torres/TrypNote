const router = require('express').Router();
const { Entry, Location, Weather } = require('../db/models/');

//GET All Entries /api/entries
router.get('/', (req, res, next) => {
  Entry.findAll({
    include: [{ model: Location }, { model: Weather }]
  })
    .then(entries => res.send(entries))
    .catch(next);
});

router.get('/:entryId', (req, res, next) => {
  Entry.findByPk(req.params.entryId, {
    include: [{ model: Location }, { model: Weather }]
  })
    .then(entry => res.json(entry))
    .catch(next);
});

module.exports = router;

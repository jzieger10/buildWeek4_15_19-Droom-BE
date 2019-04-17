const router = require('express').Router();
const Matches = require('../models/Matches');

router.get('/:id', async (req, res) => {
	try {
		const matches = Matches.get(req.params.id);
		res.status(200).json(matches);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while getting matches'
		});

		throw new Error(err);
	}
});

module.exports = router;
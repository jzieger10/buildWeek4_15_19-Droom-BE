const router = require('express').Router();
const Skills = require('../models/Skills');

// Create skills
router.post('/', async (req, res) => {
	try {
		const skills = await Skills.add(req.body.skills);
		res.status(201).json(skills);
	} catch (err) {
		res.status(500).json({
			message:
				'Sorry, but something went wrong while trying to add skills'
		});

		console.log(err);

		throw new Error(err);
	}
});

// Get skills by id
router.get('/:id', async (req, res) => {});

// Update skill
router.put('/:id', async (req, res) => {});

// Delete skill
router.put('/:id', async (req, res) => {});

module.exports = router;

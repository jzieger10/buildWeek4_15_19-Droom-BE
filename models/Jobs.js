const db = require('../database/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove
};

// Create a job
async function add(userId, job) {
	const company = await db('companies')
		.where({ userId })
		.select('id')
		.first();
	console.log(company);
	let newJob = {
		companyId: company.id,
		...job
	};
	console.log(newJob);
	const [id] = await db('jobs')
		.insert(newJob)
		.returning('id');

	console.log(id);

	return await db('jobs')
		.where({ id })
		.returning('id')
		.first();
}

// Get all jobs
function find() {
	return db('jobs');
}

// Get jobs by filter
function findBy(filter) {
	return db('jobs').where({ companyId: filter });
}

// Get job by Id
function findById(id) {
	return db('jobs')
		.where({ id })
		.first();
}

// Update a job
async function update(id, updated) {
	await db('jobs')
		.where({ id })
		.update(updated);

	return findById(id);
}

// Delete a job
function remove(id) {
	return db('jobs')
		.where({ id })
		.del();
}

const request = require('supertest');
const server = require('../server');
const db = require('../database/dbConfig');

describe('Job seeker endpoint tests', () => {
	beforeEach(async () => {
		await db('users').truncate();
		await db('seekers').truncate();
		await db('experience').truncate();
		await db('users').insert({
			email: 'email@gmail.com',
			password: 'password'
		});
		await db('seekers').insert({
			userId: 1,
			firstName: 'John',
			lastName: 'Dough',
			profilePicture: '',
			month: 2,
			day: 4,
			year: 1994,
			country: 'US',
			state: 'California',
			city: 'San Francisco',
			zipcode: 93552
		});
	});

	const auth = {
		Authorization:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJzZWVrZXIiOjAsImVtcGxveWVyIjoxLCJpYXQiOjE1NTU2NDQ3MjMsImV4cCI6MTU1NTczMTEyM30.T987Tz4dOsio_EXIt6th2_vq1yULBHQ0Jw8Zl0rJ4dE'
	};

	const seekerExperience = [
		{
			jobTitle: 'Back-end Developer',
			jobCompany: 'Nexient',
			jobDescription: 'Created apis and servers with golang',
			jobStart: '10-31-2019',
			jobEnd: '6-31-2020'
		},
		{
			jobTitle: 'Front-end Developer',
			jobCompany: 'Facebook',
			jobDescription:
				'Built out facebook market place with react',
			jobStart: '1-25-2018',
			jobEnd: '9-2-2019'
		}
	];

	const updatedExperience = {
		jobTitle: 'Front-end Developer Updated',
		jobCompany: 'Facebook',
		jobDescription: 'Built out facebook market place with react',
		jobStart: '1-25-2018',
		jobEnd: '9-2-2019'
	};

	describe('GET /api/experience/:id', () => {
		it('should return status code 404 (Not Found) if experience does not exist based off of userId', async () => {
			const response = await request(server)
				.get('/api/experience/22')
				.set(auth);

			await expect(response.status).toEqual(404);
		});

		it('should return seeker profile experience', async () => {
			let expectedExperience = {
				userId: 1,
				seekerExperience
			};

			let response = await request(server)
				.post('/api/experience')
				.send(expectedExperience)
				.set(auth);

			await expect(response.status).toBe(201);

			response = await request(server)
				.get('/api/experience/1')
				.set(auth);

			let id = 0;
			expectedExperience = seekerExperience.map(exp => {
				id++;
				return {
					id,
					seekerId: 1,
					...exp
				};
			});

			await expect(response.body).toEqual(expectedExperience);
		});
	});
});

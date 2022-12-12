const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200);
    });
})

describe('Test POST /launch', () => {

    const completeLaunchData = {
        mission: 'Kepler Exploration X',
        rocket: 'Explorer IS1',
        launchDate: 'December 27, 2030',
        target: 'Kepler-442 b',
    };

    const launchDataWithoutDate = {
        mission: 'Kepler Exploration X',
        rocket: 'Explorer IS1',
        target: 'Kepler-442 b',
    }

    const launchDataWithInvalidDate = {
        mission: 'Kepler Exploration X',
        rocket: 'Explorer IS1',
        target: 'Kepler-442 b',
        launchDate: 'Zoot'
    }

    const launchDataInvalid = {
        mission: 'Kepler Exploration X',
        rocket: 'Explorer IS1',
        launchDate: 'December 27, 2030'
    }

    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect(201);

        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataInvalid)
            .expect(400);

        expect(response.body).toStrictEqual({
            valid: false,
            error: 'Missing Required Launch Property'
        })

    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect(400);

        expect(response.body).toStrictEqual({
            valid: false,
            error: 'Invalid Launch Date'
        })
    });
})

const axios = require('axios');
const User = require('../model/user');

describe('User creation', () => {
    var userid = 0;
    test('create a demo user', async () => {
        const res = await axios.post('http://localhost:5000/api/user/register',
            {
                email: "testuser@test.com",
                name: "jestuser",
                pass: "testuser"
            })
        userid = res.data.details._id
        expect(res.status).toBe(200)
    })

    test('create an existing user', async () => {
        await axios.post('http://localhost:5000/api/user/register',
            {
                email: "testuser@test.com",
                name: "jestuser",
                pass: "testuser"
            }).catch(err => expect(err.response.status).toBe(403))
    })

    test('remove created user', async () => {
        /// Remove added user
        axios.get(`http://localhost:5000/api/user/remove/${userid}`)
            .then((res) => { expect(res.status).toBe(200); })
    })
})

describe('Validate user login', () => {
    test('login from test account', async () => {
        const res = await axios.post('http://localhost:5000/api/user/login',
            { email: 'test1@test.com', pass: 'test' })
        expect(res.status).toBe(200);
    })
})
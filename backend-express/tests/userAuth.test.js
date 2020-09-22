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
        expect(res.status).toBe(200)
        userid = res.data.details._id
    })

    test('create an existing user', async () => {
        const res = await axios.post('http://localhost:5000/api/user/register',
            {
                email: "testuser@test.com",
                name: "jestuser",
                pass: "testuser"
            })
        console.log(res)

        /// Remove added user
        const removedUser = await User.remove({_id:userid})
        console.log(removedUser)
    })
})

describe('Validate user login', () => {
    test('login from test account', async () => {
        const res = await axios.post('http://localhost:5000/api/user/login', { email: 'test1@test.com', pass: 'test' })
        expect(res.status).toBe(200);
    })
})
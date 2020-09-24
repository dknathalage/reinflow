const axios = require('axios');

describe('test access level 1 endpoints', () => {
    var token = undefined;

    var userid = 0;
    test('create a demo user', async () => {
        const res = await axios.post('http://localhost:5000/api/user/register',
            {
                email: "al1user@test.com",
                name: "jestuser",
                pass: "testuser"
            })
        userid = res.data.details._id
        expect(res.status).toBe(200)
    })

    test('logging user in', async () => {
        const res = await axios.post('http://localhost:5000/api/user/login',
            {
                email: "al1user@test.com",
                pass: "testuser"
            })

        expect(res.status).toBe(200);
        token = res.data.token
    })


    /** ENDPOINT RELATED TESTS */


    test('remove created user', async () => {
        /// Remove added user
        axios.get(`http://localhost:5000/api/user/remove/${userid}`)
            .then((res) => { expect(res.status).toBe(200); })
    })
})
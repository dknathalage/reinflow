
const axios = require('axios');

describe('test access level 3 endpoints', () => {
    var token = undefined;

    var userid = 0;
    test('create a demo user', async () => {
        const res = await axios.post('http://localhost:5000/api/user/register',
            {
                email: "al3user@test.com",
                name: "jestuser",
                pass: "testuser"
            })
        userid = res.data.details._id
        expect(res.status).toBe(200)
    })

    test('logging user in', async () => {
        const res = await axios.post('http://localhost:5000/api/user/login',
            {
                email: "al3user@test.com",
                pass: "testuser"
            })

        expect(res.status).toBe(200);
        token = res.data.token
    })

    /** ENDPOINT RELATED TESTS */
    // Check accessibility of endpoint for this access level
    test('test endpoint access for l3', async () => {
        const res = await axios.get('http://localhost:5000/api/l3',
            { headers: { authorization: token } });
        expect(res.data['route-access']).toBe(true);
    })

    test('test endpoint access for l2', async () => {
        await axios.get('http://localhost:5000/api/l2',
            { headers: { authorization: token } }).catch((err) => {
                expect(err.response.data['route-access']).toBe(false);
            });
    })

    test('test endpoint access for l2', async () => {
        await axios.get('http://localhost:5000/api/l2',
            { headers: { authorization: token } }).catch((err) => {
                expect(err.response.data['route-access']).toBe(false);
            });
    })

    test('test endpoint access for l1', async () => {
        await axios.get('http://localhost:5000/api/l1',
            { headers: { authorization: token } }).catch((err) => {
                expect(err.response.data['route-access']).toBe(false);
            });
    })

    // access related endpoints
    /// LIGHTS.JS FILE ENDPOINTS
    test('test endpoint get lights', async () => {
        const res = await axios.get('http://localhost:5000/api/l3/lights',
            { headers: { authorization: token } })
        expect(res.data['status']).toBe(true)
    })

    test('test endpoint route request', async () => {
        const res = await axios.get('http://localhost:5000/api/l3/lights/routedata/requests',
            { headers: { authorization: token } })
        expect(res.data['status']).toBe(true)
    })

    /// NAMECHANGE.JS FILE ENDPOINTS
    test('test namechange endpoint', async () => {
        const res = await axios.post('http://localhost:5000/api/l3/namechange',
            { new_username: "new_jestuser" }, { headers: { authorization: token } }).catch((err) => {
                console.log(err)
            })
        console.log(res);
    })


    /// Remove the created user from the database
    /// This step is important to maintain the future tests to execute properly

    test('remove created user', async () => {
        /// Remove added user
        axios.get(`http://localhost:5000/api/user/remove/${userid}`)
            .then((res) => { expect(res.status).toBe(200); })
    })
})
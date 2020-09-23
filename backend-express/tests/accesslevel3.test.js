const axios = require('axios');

describe('test access level 3 endpoints', () => {
    var token = undefined;
    test('logging user in', async () => {
        axios.post('http://localhost:5000/api/user/register',
            {
                email: "testuser@test.com",
                name: "jestuser",
                pass: "testuser"
            }).then((res) => {
                console.log(res);
            })
    })

})
const validation = require('../functions/userValidation');

describe('Register validation tests', ()=>{
    test('Validating name empty string', async ()=>{
        const res = await validation.registerValidation({"name":""})
        expect(res.error.details[0].message).toBe("\"name\" is not allowed to be empty")
    })

    test('Validating name length > 32', async ()=>{
        const res = await validation.registerValidation({"name":"123456789012345678901234567890123456"})
        expect(res.error.details[0].message).toBe("\"name\" length must be less than or equal to 32 characters long")
    })

    test('Validating with only name', async ()=>{
        const res = await validation.registerValidation({"name":"jesttester"})
        expect(res.error.details[0].message).toBe("\"email\" is required")
    })

    test('Validating with a wrong email', async ()=>{
        const res = await validation.registerValidation({"name":"jesttester", "email":"notanemail"})
        expect(res.error.details[0].message).toBe("\"email\" must be a valid email")
    })

    test('Validating with name and email', async ()=>{
        const res = await validation.registerValidation({"name":"jesttester", "email":"notanemail@gmail.com"})
        expect(res.error.details[0].message).toBe("\"pass\" is required")
    })

    test('Validating with name, email and pass(empty)', async ()=>{
        const res = await validation.registerValidation({"name":"jesttester", "email":"notanemail@gmail.com", "pass":""})
        expect(res.error.details[0].message).toBe("\"pass\" is not allowed to be empty")
    })

    test('Validating with acceptable name, email and pass', async ()=>{
        const res = await validation.registerValidation({"name":"jesttester", "email":"notanemail@gmail.com", "pass":"somepass"}) 
        expect(res.error).toBeUndefined()
    })
})

describe('Login validation tests', ()=>{
    test('Validating with a wrong email', async ()=>{
        const res = await validation.loginValidation({"email":"notanemail"})
        expect(res.error.details[0].message).toBe("\"email\" must be a valid email")
    })

    test('Validating with name and email', async ()=>{
        const res = await validation.loginValidation({"email":"notanemail@gmail.com"})
        expect(res.error.details[0].message).toBe("\"pass\" is required")
    })

    test('Validating with name, email and pass(empty)', async ()=>{
        const res = await validation.loginValidation({"email":"notanemail@gmail.com", "pass":""})
        expect(res.error.details[0].message).toBe("\"pass\" is not allowed to be empty")
    })

    test('Validating with acceptable name, email and pass', async ()=>{
        const res = await validation.loginValidation({"email":"notanemail@gmail.com", "pass":"somepass"}) 
        expect(res.error).toBeUndefined()
    })
})
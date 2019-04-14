const faker = require('faker');
let userData, authView, pageLoaded;

beforeAll(async () => {
    // TODO: make domain dynamic
    await page.goto("http://127.0.0.1:3000/register");

    // fake user data { username, email, password }
    userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    authView = await page.waitForSelector('.auth-view');
    pageLoaded = page;
});

describe("The /register view", () => {
    it("Register should load with the auth-view container", async () => {
       expect(authView);
    });
});

describe("Error handling", () => {
    it("sending empty fields returns fields required", async () => {
        let fieldsToLookFor = ['username', 'email', 'password'];

        // populate the fields
        await page.type("#username", "");
        await page.type("#email", "");
        await page.type("#password", "");

        // Listener for the submit response
        await page.on('response', async response => {
            let body = await response.json(),
                errors = body.errors, message;

            // make sure we have the errors for all fields
            expect(errors.length).toBe(fieldsToLookFor.length);

            // check that all empty fields are returned
            for (let error in errors) {
                let field = errors[error].field,
                    message = errors[error].message;

                // field in response should exist in fields to look for
                expect(fieldsToLookFor.includes(field)).toBeTruthy();

                // check message with field is what we expect (i.e. username is required)
                let errorRegex = new RegExp(field + ".*required","i");
                expect(message.match(errorRegex)).toBeTruthy();
            }

            expect(response.status()).toBe(400);
        });

        // submit the response
        await page.click("#register-button");

        let messageBlock = await page.waitForSelector(".message-block.error");
        expect(messageBlock);
    });
});

describe("can fill out and post fields", () => {
    it("can fill out fields and they contain expected data", async () => {
        await page.type("#username", userData.username);
        await page.type("#email", userData.email);
        await page.type("#password", userData.password);

        // post data should match userData
        await page.on('request', async request => {
            let postData = JSON.parse(await request.postData());
            expect(postData.username === userData.username).toBe(true);
            expect(postData.email === userData.email).toBe(true);
            expect(postData.password === userData.password).toBe(true);
        });

        // Response must be true
        await page.on('response', async response => {
           expect(response.ok());
        });

        await page.click("#register-button");
    });
});
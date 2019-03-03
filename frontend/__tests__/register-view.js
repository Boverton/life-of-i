const faker = require('faker');
let userData, authView;

beforeAll(async () => {
    await page.goto("http://127.0.0.1:3000/register");
    userData = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    authView = await page.waitForSelector('.auth-view');
});

describe('The /register view', () => {
    it("Register should load with the auth-view container", async () => {
       expect(authView);
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
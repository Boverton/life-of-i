describe('Express Server', () => {
    beforeAll(async () => {
        await page.goto('http://127.0.0.1:3001/are-we-up')
    });

    it('should display OK', async () => {
        await expect(page).toMatch('OK')
    })
});
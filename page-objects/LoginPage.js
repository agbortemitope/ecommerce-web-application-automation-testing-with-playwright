import { expect, timeout } from "../playwright.config";

export class LoginPage {
    constructor(page) {
        this.page = page
        this.moveToSignUpBtn = page.locator('[data-qa="go-to-signup-button"]')

    }

    moveToSignUp = async () => {
        await this.moveToSignUpBtn.waitFor()
        await this.moveToSignUpBtn.click()
        // await this.page.waitForURL(/\|signup/, {timeout: 3000}) 
    }
}
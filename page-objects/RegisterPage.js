import { expect } from "@playwright/test";

export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailInput = page.getByPlaceholder('E-mail')
        this.pwdInput = page.getByPlaceholder('Password')
        this.registerBtn = page.getByRole("button", {name: 'Register'})
    }
 
    signUpAsNewUser = async (email, password) => {
        // input email
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)

        // input password
        await this.pwdInput.waitFor()
        await this.pwdInput.fill(password)

        // click register button
        await this.registerBtn.waitFor()
        await this.registerBtn.click()
        
    }
}
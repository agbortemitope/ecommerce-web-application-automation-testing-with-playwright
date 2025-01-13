import { firefox } from "@playwright/test"
import { v4 as uuidv4 } from 'uuid';


export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameField = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameField = page.locator('[data-qa="delivery-last-name"]')
        this.street = page.locator('[data-qa="delivery-address-street"]')
        this.postCodeField = page.locator('[data-qa="delivery-postcode"]')
        this.city = page.locator('[data-qa="delivery-city"]')
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')

    }

    fillDetails = async (firstName, lastName, street, postCode, city) => {
        // input first name
        await this.firstNameField.waitFor()
        await this.firstNameField.fill(firstName)
        
        // input last name
        await this.lastNameField.waitFor()
        await this.lastNameField.fill(lastName)

        // input street name
        await this.street.waitFor()
        await this.street.fill(street)

        // input postcode
        await this.postCodeField.waitFor()
        await this.postCodeField.fill(postCode)

        // input city
        await this.city.waitFor()
        await this.city.fill(city)

        // select country
        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption('Angola')
        await this.countryDropdown.click()

    }
    
}
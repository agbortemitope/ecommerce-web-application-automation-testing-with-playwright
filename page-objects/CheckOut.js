import { test, expect, } from "@playwright/test";
import { timeout } from "../playwright.config";




export class CheckOut {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveBtn = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]')
        
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        await this.basketItemPrice.first().waitFor()
        const ItemRemoval = await this.basketCards.count()

        // find smallest price
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceText.map((e) => {
            const withoutDollarSign = e.replace("$", "")
            return parseInt(withoutDollarSign, 10)     
        }) 
       
        const smallestPrice = Math.min(...justNumbers)
        const smallestPriceIndex = justNumbers.indexOf(smallestPrice)
        
        const specificRemoveBtn = this.basketItemRemoveBtn.nth(smallestPriceIndex)
        await specificRemoveBtn.waitFor()
        await specificRemoveBtn.click()
        await expect(this.basketCards).toHaveCount(ItemRemoval - 1)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutBtn.waitFor()
        await this.continueToCheckoutBtn.click()
        // await this.page.waitForURL(/\|login/) 
  
    }
}
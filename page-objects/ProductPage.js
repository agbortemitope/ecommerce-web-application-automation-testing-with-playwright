import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"

export class ProductPage {
    constructor(page) {
        this.page = page
        
        this.addBtns = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
      await  this.page.goto("/")
    }

    addProductToBasket = async (i) => {
        const specificAddBtn = this.addBtns.nth(i)
        await expect(specificAddBtn).toHaveText('Add to Basket')
        await specificAddBtn.waitFor()

        const navigation = new Navigation(this.page)
        const basketCountBeforeClick = await navigation.getBasketCount()
        await specificAddBtn.click()
        await expect(specificAddBtn).toHaveText('Remove from Basket')
        const basketCountAfterClick = await navigation.getBasketCount()
        // await expect(basketCountAfterClick).toBeGreaterThan(basketCountBeforeClick)

        if (basketCountAfterClick > basketCountBeforeClick) {
           
            console.log(true);
            
        }
        
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()

        // get order of products
        await this.productTitle.first().waitFor()
        const productTitleBeforeSorting = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption('price-asc')
        const productTitleAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting)
    }
   

    
}
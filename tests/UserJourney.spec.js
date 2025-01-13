// @ts-check
import { test, expect } from "@playwright/test";
import { ProductPage } from "../page-objects/ProductPage";
import { Navigation } from "../page-objects/Navigation";
import { CheckOut } from "../page-objects/CheckOut";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { v4 as uuidv4 } from 'uuid';
import { DeliveryDetails } from "../page-objects/DeliveryDetails";

test.only("new user full journey", async ({ page }) => {
  
        const productPage = new ProductPage(page)
        const navigation = new Navigation(page)
        const checkOut = new CheckOut(page)
        const login = new LoginPage(page)
        const register = new RegisterPage(page)

        await productPage.visit()
        await productPage.sortByCheapest()
        await productPage.addProductToBasket(0) 
        await productPage.addProductToBasket(1)
        await productPage.addProductToBasket(2)

        await navigation.goToCheckout()
        await checkOut.removeCheapestProduct()
        await checkOut.continueToCheckout()

        await login.moveToSignUp()

        const email = uuidv4() + 'gmail.com'
        const password = uuidv4()
        await register.signUpAsNewUser(email, password)

        const deliveryDetails = new DeliveryDetails(page)
        const firstName = uuidv4()
        const lastName = uuidv4()
        const street = uuidv4()
        const postCode = uuidv4()
        const city = uuidv4()
        await deliveryDetails.fillDetails(firstName, lastName, street, postCode, city)
        
        await page.pause()
})
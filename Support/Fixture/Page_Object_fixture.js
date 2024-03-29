const base   = require ('@playwright/test')
const {request} = require('@playwright/test')
const{SignUp} = require('../Page_Object/SignupPage')
const {SignIn} = require('../Page_Object/SignInPage')
const {OrderProduct} = require('../Page_Object/OrderProduct')
const { API_call } = require('../API_Utils/LoginAPI')
const {OrderVerify} = require('../Page_Object/OrderVerify')



exports.test = base.test.extend
({
    registerPage: async({page, isMobile}, use)=>
    {
        const registerPage = new SignUp(page, isMobile)
        await use(registerPage) 
    },
    loginPage: async({page, isMobile}, use)=>
    {
        const loginPage = new SignIn(page, isMobile)
        await use(loginPage)
    },
    orderSelectedProduct: async({page, isMobile},use)=>
    {
        const orderSelectedProduct = new OrderProduct(page,isMobile)
        await use(orderSelectedProduct)
    },
    API: async({page}, use)=>
    {
        const loginPayload = { userEmail: "test_1@gmail.com", userPassword: "Test@123" }
        const OrderPayload = { orders: [{ country: "India", productOrderedId: "6262e990e26b7e1a10e89bfa" }] }


        const apiContext = await request.newContext()
        const API = new API_call(apiContext, loginPayload)
        await API.AddTokenInLocalStorage(page)
        
        await use(API)

    },

    VerifyOrder: async({page , isMobile},use)=>
    {
        const VerifyOrder = new OrderVerify(page, isMobile)
        await use(VerifyOrder)
    }

})



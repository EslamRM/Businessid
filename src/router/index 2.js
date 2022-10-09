import Vue from "vue";
import Router from "vue-router";
import auth from "./middleware/auth";
import guest from "./middleware/guest";
import middlewarePipeline from "./middleware/middlewarePipeline";
import store from "@/store/store.js";

import appHome from "../components/pages/homePage/homePageMain.vue";
import PageNotFound from "../components/404.vue";
import ctShots from "../components/pages/ctshots/ctShots.vue";
import Videoshot from "../components/pages/ctshots/videoShot.vue";
import shotsDetail from "../components/pages/ctshots/shotsDetail.vue";
import Campaign from "../components/pages/campaign/campaign";
import Notification from "../components/pages/notification/notification";
import postDetails from "../components/pages/newsfeed/postDetails";
import dsMarket from "../components/pages/dsmarket/dsmarketHome.vue";
import CompanyMarket from "../components/pages/dsmarket/CompanyMarket/CompanyMarket.vue";
import newsFeed from "../components/pages/newsfeed/newsfeedHome.vue";
import statistics from "../components/pages/statistics/StatisticsHome.vue";
import demands from "../components/pages/dsmarket/demands/demands.vue";
import properties from "../components/pages/dsmarket/properties/properties.vue";
import propertiesforrent from "../components/pages/dsmarket/properties/propertiesforrent.vue";
import propertiesforsale from "../components/pages/dsmarket/properties/propertiesforsale.vue";
import propertyDetail from "../components/pages/dsmarket/properties/propertyDetail.vue";
import autos from "../components/pages/dsmarket/motors/autos.vue";
import autoDetail from "../components/pages/dsmarket/motors/autoDetail.vue";
import services from "../components/pages/dsmarket/services/services.vue";
import cartList from "../components/pages/dsmarket/cart/cartList.vue";
import checkOut from "../components/pages/dsmarket/cart/checkOut.vue";
import orderConfirm from "../components/pages/dsmarket/cart/orderConfirm";
import changeAddress from "../components/pages/dsmarket/cart/changeAddress";
import editAddress from "../components/pages/dsmarket/cart/editAddress";

import logIn from "../components/pages/LoginRegister/logIn.vue";
import resetPassword from "../components/pages/LoginRegister/resetPassword.vue";
import forgotPassword from "../components/pages/LoginRegister/forgotPassword.vue";
import registerHome from "../components/pages/LoginRegister/registerHome.vue";
import personalAccount from "../components/pages/LoginRegister/personalAccount.vue";
import businessAccount from "../components/pages/LoginRegister/businessAccount.vue";

import dsmarketHomePage from "../components/pages/dsmarket/dsmarketHomePage.vue";
import productDetailpage from "../components/pages/dsmarket/productDetailpage.vue";
import allCategory from "../components/pages/dsmarket/allCategory";
import qutationForm from "../components/pages/dsmarket/qutationForm.vue";

import profilePage from "../components/pages/profile/profileHome.vue";
import profileAboutPage from "../components/pages/profile/about.vue";
import profileContactPage from "../components/pages/profile/contacts.vue";
import profileProperties from "../components/pages/profile/companyProperties.vue";
import profileStore from "../components/pages/profile/profileStore.vue";
import profileServices from "../components/pages/profile/profileServices.vue";
import profileAutos from "../components/pages/profile/profileAutos.vue";
import profileGallery from "../components/pages/profile/profileGallery.vue";
import profileVideos from "../components/pages/profile/profileVideos.vue";

import buyerOrdersMain from "../components/pages/profileDashboard/buyer/orders/buyerOrdersMain.vue";
import pending from "../components/pages/profileDashboard/buyer/orders/pending.vue";
import delivered from "../components/pages/profileDashboard/buyer/orders/delivered.vue";
import cancelled from "../components/pages/profileDashboard/buyer/orders/cancelled.vue";
import orderDetails from "../components/pages/profileDashboard/buyer/orders/ordersDetails.vue";
import profileNewsfeed from "../components/pages/profile/profileNewsfeed.vue";
import profileTimeline from "../components/pages/profile/profileTimeline";
import profileDashboard from "../components/pages/profileDashboard/dashboardMain.vue";
import DashboardNav1 from "../components/pages/profileDashboard/vendor/listingGrid1.vue";
import DashboardNav2 from "../components/pages/profileDashboard/vendor/listingGrid2.vue";
import DashboardAddproduct from "../components/pages/profileDashboard/vendor/addProducts.vue";
import addProperty from "../components/pages/profileDashboard/vendor/addProperty.vue";
import Autoaddhome from "../components/pages/profileDashboard/vendor/auto/autoHome.vue";
import addAuto from "../components/pages/profileDashboard/vendor/manageStore/addAuto.vue";
import addBoats from "../components/pages/profileDashboard/vendor/auto/addBoats.vue";
import addHeavyVehicles from "../components/pages/profileDashboard/vendor/auto/addHeavyVehicles.vue";
import addAccessories from "../components/pages/profileDashboard/vendor/auto/addAccessories.vue";
import addAccessoriesAndSpareParts from "../components/pages/profileDashboard/vendor/auto/addAccessoriesAndSpareParts.vue";
import addMotorcycles from "../components/pages/profileDashboard/vendor/auto/addMotorcycles.vue";
import addNumberPlates from "../components/pages/profileDashboard/vendor/auto/addNumberPlates.vue";

import profileMainDashbord from "../components/pages/profileDashboard/vendor/profileDashbord.vue";
import welcomeAdmin from "../components/pages/profileDashboard/vendor/welcomeAdmin.vue";

import advertisementsMain from "../components/pages/profileDashboard/vendor/advertisements/advertisementsMain.vue";
import homePage from "../components/pages/profileDashboard/vendor/advertisements/homePage.vue";
import dsMarketPage from "../components/pages/profileDashboard/vendor/advertisements/dsMarketPage.vue";
import social from "../components/pages/profileDashboard/vendor/advertisements/social.vue";

import walletMain from "../components/pages/profileDashboard/vendor/wallet/walletMain.vue";
import wallet from "../components/pages/profileDashboard/vendor/wallet/wallet.vue";
import accounts from "../components/pages/profileDashboard/vendor/wallet/accounts.vue";

import termsAndConditions from "../components/pages/termsAndCondition/termsAndConditions.vue";

import manageStoreProducts from "../components/pages/profileDashboard/vendor/manageStore/products.vue";
import manageStoreMain from "../components/pages/profileDashboard/vendor/manageStore/manageStoreMain.vue";
import manageStoreProperties from "../components/pages/profileDashboard/vendor/manageStore/properties.vue";
import manageStoreAuto from "../components/pages/profileDashboard/vendor/manageStore/auto.vue";
import manageStoreServices from "../components/pages/profileDashboard/vendor/manageStore/services.vue";
import manageStoreFoods from "../components/pages/profileDashboard/vendor/manageStore/foods.vue";

import registrations from "../components/pages/profileDashboard/admin/registrations/registrations.vue";
import details from "../components/pages/profileDashboard/admin/registrations/details.vue";

import shippingHome from "../components/pages/profileDashboard/vendor/shipping/shippingHome.vue";
import manageShipping from "../components/pages/profileDashboard/vendor/shipping/manageShipping.vue";
import manageStockLocation from "../components/pages/profileDashboard/vendor/stockLocation/manageStockLocation.vue";
import registrationsRequest from "../components/pages/profileDashboard/sales/registrations.vue";

import manageUsers from "../components/pages/profileDashboard/vendor/users/users.vue";
import addSubUser from "../components/pages/profileDashboard/vendor/users/addSubUsers.vue";
import invitation from "../components/pages/profileDashboard/vendor/users/invitation.vue";

import purchaseInvoice from "../components/pages/profileDashboard/vendor/purchaseInvoice/invoice.vue";
import purchaseInvoiceDetails from "../components/pages/profileDashboard/vendor/purchaseInvoice/details.vue";

import vendorOrdersMain from "@/components/pages/profileDashboard/vendor/orders/vendorOrdersMain.vue";
import orderPending from "../components/pages/profileDashboard/vendor/orders/orderPending.vue";
import orderDispatched from "../components/pages/profileDashboard/vendor/orders/orderDispatched.vue";
import orderDelivered from "../components/pages/profileDashboard/vendor/orders/orderDelivered.vue";
import orderCancelled from "../components/pages/profileDashboard/vendor/orders/orderCancelled.vue";
import editOrder from "../components/pages/profileDashboard/vendor/orders/editOrder.vue";
import manageAdressWelcome from "../components/pages/profileDashboard/vendor/manageAddresses/manageAddressesMain.vue";
import managePaymentsWelcome from "../components/pages/profileDashboard/vendor/managePayments/ManagePaymentsWelcome.vue";
import profileManagePage from "../components/pages/profileDashboard/common/manageProfile/manageProfileWelcome.vue";
import basicInfo from "../components/pages/profileDashboard/common/manageProfile/basicInfo.vue";
import billingAddress from "../components/pages/profileDashboard/common/manageProfile/billingAddress.vue";
import accountSetting from "../components/pages/profileDashboard/common/manageProfile/accountSetting.vue";
import changePassword from "../components/pages/profileDashboard/common/manageProfile/changePassword.vue";
import serviceDetail from "../components/ctcomponents/services/serviceDetail";
import profileQutation from "../components/pages/profileDashboard/vendor/quotation/qutationHome.vue";
import QutationFromDemander from "../components/pages/profileDashboard/vendor/quotation/qutationDetail/qutationFromDemander.vue";
import Demander from "../components/pages/profileDashboard/vendor/quotation/qutationDetail/demander.vue";
import ProductDetail from "../components/pages/profileDashboard/vendor/quotation/qutationDetail/productDetail.vue";
import Supplier from "../components/pages/profileDashboard/vendor/quotation/qutationDetail/supplier.vue";
import QutationForm from "../components/pages/profileDashboard/vendor/quotation/qutationDetail/qutationForm.vue";
import Shipping from "../components/pages/profileDashboard/vendor/shipping/shippingHero.vue";

import searchResult from "../components/pages/searchResult/index.vue";

import chatHome from "../components/pages/chat/chatHome.vue";

// Error Pages
import ForbiddenPage from "../components/errorPages/forbidden";
import RequestTimeout from "../components/errorPages/request-timeout";
import ServiceUnavailable from "../components/errorPages/service-unavailable";
import UnexpectedError from "../components/errorPages/unexpected-error";
import offline from "../components/errorPages/offline";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/terms-and-conditions",
      name: "/terms-and-conditions",
      component: termsAndConditions
    },

    {
      path: "/campaign",
      name: "campaign",
      component: Campaign
    },
    {
      path: "/logIn",
      name: "logIn",
      component: logIn,
      props: true,
      meta: {
        middleware: [guest]
      }
    },
    {
      path: "/reset-password",
      name: "resetPassword",
      component: resetPassword,
      props: true
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: forgotPassword,
      props: true
    },
    {
      path: "/registerHome",
      name: "RegisterHome",
      component: registerHome,
      children: [
        {
          path: "/personalAccount",
          component: personalAccount,
          name: "personalAccount"
        },
        {
          path: "/businessAccount",
          component: businessAccount,
          name: "businessAccount"
        }
      ]
    },
    {
      path: "/",
      name: "appHome",
      component: () =>
        new Promise(resolve => setTimeout(() => resolve(dsmarketHomePage), 1000))
    },
    {
      path: "/ctshots",
      name: "ctShots",
      // component: ctShots
      component: () =>
        new Promise(resolve => setTimeout(() => resolve(ctShots), 1000))
    },

    {
      path: "/video-detail/:id",
      name: "VideoDetail",
      component: Videoshot
    },

    {
      path: "/shotsDetail/:id",
      name: "PhotoDetail",
      component: shotsDetail
    },

    {
      path: "/notification",
      name: "Notification",
      component: Notification
    },
    {
      path: "/dsmarket/:name",
      name: "company-market",
      component: CompanyMarket,
      children: [
        { path: "", component: dsmarketHomePage, name: "dsmarketHomePage" }
      ]
    },
    {
      path: "/dsmarket",
      name: "dsMarketss",
      component: dsMarket,

      //component:() => new Promise(resolve => setTimeout(() => resolve(dsMarket), 500)),
      children: [
        {
          path: "",
          component: dsmarketHomePage,
          name: "dsmarketHomePage"
        },
        {
          path: "/store",
          name: "demands",
          component: demands
        },

        {
          path: "/productDetailpage",
          name: "productDetailpage",
          component: productDetailpage
        },
        {
          path: "/all-category",
          name: "allCategory",
          component: allCategory
        },
        {
          path: "/qutationForm/:productId",
          name: "qutationForm",
          component: qutationForm
        },
        {
          path: "/properties",
          name: "properties",
          component: properties
        },
        {
          path: "/propertiesforrent",
          name: "propertiesforrent",
          component: propertiesforrent
        },
        {
          path: "/propertiesforsale",
          name: "propertiesforsale",
          component: propertiesforrent
        },
        {
          path: "/property-detail/:name/:id",
          name: "property-detail",
          component: propertyDetail
        },
        {
          path: "/autos",
          name: "autos",
          component: autos
        },

        {
          path: "/auto-details/:auto/:autoId",

          name: "auto-details",
          component: autoDetail
        },
        {
          path: "/services",
          name: "services",
          component: services
        },
        {
          path: "/exports",
          name: "exports",
          component: propertiesforrent
        },
        {
          path: "/imports",
          name: "imports",
          component: autos
        },
        {
          path: "/buyer/cart",
          name: "cart",
          component: cartList
        },
        {
          path: "/checkout/:name/:id",
          name: "checkout",
          component: checkOut,
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "/confirm",
          name: "orderConfirm",
          component: orderConfirm,
          meta: {
            middleware: [auth]
          }
        },
        {
          path: "/change-address",
          name: "changeAddress",
          component: changeAddress
        },
        {
          path: "/edit-address",
          name: "editAddress",
          component: editAddress
        }
      ]
    },
    {
      path: "/newsfeed",
      name: "newsfeed",

      component: newsFeed
      //component:() => new Promise(resolve => setTimeout(() => resolve(newsFeed), 500))
    },
    {
      path: "/newsfeed/post/:id",
      name: "post-details",

      component: postDetails
      //component:() => new Promise(resolve => setTimeout(() => resolve(newsFeed), 500))
    },
    // {
    //   path: "/cartpage",
    //   name: "appHomnewsFeede",
    //   component:() => new Promise(resolve => setTimeout(() => resolve(cartPage), 500))
    // },
    {
      path: "/StatisticsHome",
      name: "statistics",
      //component: statistics
      component: () =>
        new Promise(resolve => setTimeout(() => resolve(statistics), 500))
    },
    {
      path: "/profile/:name/:id",
      name: "profile",
      // component: profilePage,
      component: profilePage,
      meta: {
        middleware: [auth]
      },
      children: [
        {
          path: "",
          component: profileNewsfeed,
          meta: {
            middleware: [auth]
          }
        },
        { path: "/profiletimeline/:name/:id", component: profileTimeline },
        { path: "/profileproperties/:name/:id", component: profileProperties },
        {
          path: "/profilestore/:name/:id",
          component: profileStore
        },
        { path: "/profileservices/:name/:id", component: profileServices },
        { path: "/profileautos/:name/:id", component: profileAutos },
        { path: "/about/:name/:id", component: profileAboutPage },
        { path: "/contacts/:name/:id", component: profileContactPage },

        { path: "/gallery/:name/:id", component: profileGallery },
        { path: "/profilevideos/:name/:id", component: profileVideos }
      ]
    },
    {
      path: "/product-details/:product/:productId",
      name: "product-details",
      component: productDetailpage
    },
    {
      path: "/service-details/:product/:productId",
      name: "service-details",
      component: serviceDetail
    },
    // {
    //   path: "/dashboard",
    //   name: "profileDashboard",
    //   component: profileDashboard,
    //   meta: {
    //     middleware: [auth]
    //   },
    //   children: []
    // },
    {
      path: "/dashboard",
      // name: "dashboard",
      component: profileMainDashbord,
      meta: {
        middleware: [auth]
      },
      children: [
        {
          path: "",
          name: "welcomeAdmin",
          meta: {
            middleware: [auth]
          },
          component: welcomeAdmin
        },
        //******************************************/
        // ***************BUYERS MODULES************/
        //*****************************************/
        //-----------------------------------------ORDERS MODULE----------------------------//
        {
          path: "/dashboard/buyer/orders/",
          name: "buyerOrdersMain",
          component: buyerOrdersMain,
          meta: {
            middleware: [auth]
          },
          children: [
            {
              path: "",
              name: "buyersOrderPending",
              component: pending
            },
            {
              path: "delivered",
              name: "buyersOrderDelivered",
              component: delivered
            },
            {
              path: "cancelled",
              name: "buyersOrderCancelled",
              component: cancelled,
              props: true
            },
            {
              path: "details",
              name: "buyersOrderDetails",
              component: orderDetails,
              props: true
            }
          ]
        },

        //-----------------------------------------ORDERS MODULE END----------------------------//
        //******************************************************************************************************************************** */
        //******************************************/
        // ***************VENDOR MODULES************/
        //*****************************************/
        //-----------------------------------------ORDERS MODULE----------------------------//
        {
          path: "vendor/orders/",
          name: "vendorOrders",
          component: vendorOrdersMain,
          children: [
            {
              path: "",
              component: orderPending
            },
            {
              path: "details/:id",
              component: editOrder,
              name: "vendorEditOrder",
              props: true
            },
            {
              path: "dispatched",
              component: orderDispatched
            },
            {
              path: "delivered",
              component: orderDelivered
            },
            {
              path: "cancelled",
              component: orderCancelled
            }
          ]
        },
        //-----------------------------------------ORDERS MODULE-MANAGE-STORE-START----------------------------//

        {
          path: "/dashboard/vendor/manage-store/",
          component: manageStoreMain,
          name: "manageStoreMain",
          redirect: "/dashboard/vendor/manage-store/item",
          children: [
            {
              path: ":type",
              component: manageStoreProducts,
              name: "manageStoreProducts"
            }
          ]
        },

        // {
        //   path: "/dashboard/vendor/manage-store/:type",
        //   name: "manageStoreProperties",
        //   component: manageStoreProducts,
        //   params: {
        //     type: "property "
        //   }
        // },
        // {
        //   path: "/dashboard/vendor/manage-store/:type",
        //   name: "manageStoreAuto",
        //   component: manageStoreProducts,
        //   params: {
        //     type: "auto"
        //   }
        // },
        // {
        //   path: "/dashboard/vendor/manage-store/services",
        //   component: manageStoreServices
        // },
        // {
        //   path: "/dashboard/vendor/manage-store/foods",
        //   component: manageStoreFoods
        // },

        //-----------------------------------------ORDERS MODULE-MANAGE-STORE-END-----------------------------//

        //-----------------------------------------VENDOR-MODULE-ADVERTISEMENTS-START----------------------------//
        {
          path: "/dashboard/vendor/advertisements/",
          component: homePage
        },

        {
          path: "/dashboard/vendor/advertisements/ds-market/",
          component: dsMarketPage
        },

        {
          path: "/dashboard/vendor/advertisements/social/",
          component: social
        },

        //-----------------------------------------VENDOR-MODULE-ADVERTISEMENTS-END----------------------------//

        //-----------------------------------------VENDOR-MODULE-WALLET-START----------------------------//
        {
          path: "/dashboard/vendor/wallet",
          component: wallet
        },

        {
          path: "/dashboard/vendor/wallet/accounts/",
          component: accounts
        },

        {
          path: "/dashboard/vendor/advertisements/social/",
          component: social
        },

        //-----------------------------------------VENDOR-MODULE-WALLET-END----------------------------//

        //-----------------------------------------ORDERS MODULE-REGISTRATION-START----------------------------//

        {
          path: "/dashboard/admin/registrations",
          component: registrations
        },

        {
          path: "/dashboard/admin/registrations/details",
          name: "registrationDetails",
          component: details,
          props: true
        },
        //-----------------------------------------ORDERS MODULE-REGISTRATION-END-----------------------------//
        //-----------------------------------------SUB USER-REGISTRATION-START----------------------------//

        {
          path: "/dashboard/vendor/manage-sub-user",
          component: addSubUser
        },

        //-----------------------------------------SUB USER-REGISTRATION-END-----------------------------//

        //-----------------------------------------SALES MODULE-REGISTRATION-START----------------------------//

        {
          path: "/dashboard/sales/registration-request",
          component: registrationsRequest
        },

        //-----------------------------------------SALES MODULE-REGISTRATION-END-----------------------------//

        //-----------------------------------------USERS MODULE-REGISTRATION-START----------------------------//

        {
          path: "/dashboard/vendor/users/manage-users",
          component: manageUsers
        },

        //-----------------------------------------USERS MODULE-REGISTRATION-END-----------------------------//

        //-----------------------------------------VENDOR INVOICE -START----------------------------//

        {
          path: "/dashboard/vendor/purchase-invoice/",
          component: purchaseInvoice
        },

        {
          path: "/dashboard/vendor/purchase-invoice/details/:id",
          component: purchaseInvoiceDetails,
          name: "purchaseInvoiceDetails",
          props: true,
          meta: {
            title: "Businessid.net"
          }
        },

        //-----------------------------------------VENDOR INVOICE -END----------------------------//

        //-----------------------------------------ORDERS MODULE END----------------------------//
        //******************************************************************************************************************************** */
        //-----------------------------------------MANAGE ADDRESS MODULE----------------------------//
        {
          path: "vendor/profileManageAddress",
          component: manageAdressWelcome
        },
        //-----------------------------------------MANAGE ADDRESS MODULE END----------------------------//
        //******************************************************************************************************************************** */
        //-----------------------------------------MANAGE PAYMENTS MODULE----------------------------//
        {
          path: "vendor/manage-payment",
          component: managePaymentsWelcome
        },
        //-----------------------------------------MANAGE PAYMENTS MODULE END----------------------------//
        //******************************************************************************************************************************** */
        //-----------------------------------------PROFILE QUTATION MODULE ----------------------------//
        {
          path: "vendor/quotations",
          component: profileQutation
        },
        {
          path: "vendor/qutationFromDemander",
          component: QutationFromDemander,
          children: [
            {
              path: "demander",
              component: Demander
            },
            {
              path: "/vendor/productDetail",
              component: ProductDetail
            },
            {
              path: "/vendor/supplier",
              component: Supplier
            },
            {
              path: "/vendor/qutationForm",
              component: QutationForm
            }
          ]
        },
        //-----------------------------------------PROFILE QUTATION MODULE END----------------------------//
        //******************************************************************************************************************************** */
        //-----------------------------------------SHIPPING MODULE---------------------------------------//
        {
          path: "vendor/manage-shipping",
          name: "shippingHome",
          component: shippingHome,
          redirect: "/dashboard/vendor/manage-shipping/shipping",
          children: [
            {
              path: "shipping",
              name: "manageShipping",
              component: manageShipping
            },
            {
              path: "stockLocation",
              name: "manageStockLocation",
              component: manageStockLocation
            }
          ]
        },
        //-----------------------------------------SHIPPING MODULE END---------------------------------------//
        //******************************************************************************************************************************** */
        //-----------------------------------------ADD NEW PRODUCT MODULE---------------------------------------//
        { path: "vendor/addnewitems", component: DashboardNav1 },
        { path: "vendor/add", component: DashboardNav2 },
        { path: "vendor/item", component: DashboardAddproduct },
        {
          path: "vendor/auto",
          component: Autoaddhome
        },
        {
          path: "vendor/addAuto",
          name: "addAuto",
          component: addAuto
        },
        {
          path: "vendor/addBoat",
          name: "addBoats",
          component: addBoats
        },
        {
          path: "vendor/addHeavyVehicles",
          name: "addHeavyVehicles",
          component: addHeavyVehicles
        },
        {
          path: "vendor/addAccessoriesAndSpareParts",
          name: "addAccessoriesAndSpareParts",
          component: addAccessoriesAndSpareParts
        },
        {
          path: "vendor/addMotorcycles",
          name: "addMotorcycles",
          component: addMotorcycles
        },
        {
          path: "vendor/addNumberPlates",
          name: "addNumberPlates",
          component: addNumberPlates
        },
        { path: "vendor/property", component: addProperty },

        { path: "vendor/addAccessories", component: addAccessories },
        //-----------------------------------------ADD NEW PRODUCT MODULE END---------------------------------------//
        //******************************************************************************************************************************** */
        //-----------------------------------------MANAGE STORE MODULE---------------------------------------//
        { path: "vendor/manageStore", component: welcomeAdmin },
        //-----------------------------------------SALES REPORT MODULE---------------------------------------//
        { path: "vendor/sales-report", component: manageUsers },
        //-----------------------------------------MANAGE STOCK LOCATION MODULE---------------------------------------//
        {
          path: "vendor/manage-stock-location",
          component: manageStockLocation
        },
        //-----------------------------------------MANAGE STORE MODULE END---------------------------------------//
        //******************************************************************************************************************************** */
        //******************************************/
        //****************COMMON MODULES************/
        //******************************************/
        //-----------------------------------------MANAGE PROFILE MODULE---------------------------------------//
        {
          path: "common/settings/",
          name: "profileManagePage",
          component: profileManagePage,
          children: [
            {
              path: "",
              component: basicInfo
            },

            // {
            //   path: "billingAddress",
            //   component: billingAddress
            // },
            {
              path: "accountSetting",
              component: accountSetting
            },
            {
              path: "changePassword",
              component: changePassword
            }
          ]
        }
        //-----------------------------------------MANAGE PROFILE MODULE END---------------------------------------//
        //******************************************************************************************************************************** */
      ]
    },
    {
      path: "/search-result",
      component: searchResult
    },

    {
      path: "/chatHome",
      component: chatHome
    },
    {
      path: "/invitation",
      alias: "/invitation",
      name: "invitation",
      component: invitation
    },
    // Error Pages
    { path: "*", component: PageNotFound },
    { path: "/forbidden", component: ForbiddenPage },
    { path: "/request-timeout", component: RequestTimeout },
    { path: "/service-unavailable", component: ServiceUnavailable },
    { path: "/unexpected-error", component: UnexpectedError },
    { path: "/offline", component: offline }
  ],
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
router.beforeEach(async (to, from, next) => {
  // What is this Code ?
  // 1. Check Matched [1] exists
  // 2. Check matched[0] & [1] are 'dashboard'
  // 3. If 2 is true, then when we click on Dashboard button the path is '/dashboard' so the function
  //    should not go deep and continue other process.

  // If it enters inside the loop it dispatches an event in "profile.component.js";
  // TODO: While removing this code please remove async bcz this function is async
  // By Abhishek M. Patel (abhishekpatel167@gmail.com)

  if (
    to.matched[1] &&
    (to.matched[0].path === "/dashboard" ||
      to.matched[1].path === "/dashboard/") &&
    to.fullPath !== "/dashboard" &&
    to.fullPath !== "/dashboard/"
  ) {
    console.log("Checking User Permission", to.fullPath);
    await store.dispatch("check_user_permission", { to, next });
  }

  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router;

const extra_routes = {
          path: "/vendor/manageStore/:name/:id",
          component: manageStore,
          children: [
            {
              path: "",
              component: profileStore
            },
            {
              path: "/vendor/editProduct",
              component: editproductDashboard
            },

            {
              path: "/vendor/manageStore",
              component: manageProductsMain
            },
            {
              path: "/vendor/manageProperties",
              component: managePropertiesMain
            },
            {
              path: "/vendor/manageAutos",
              component: manageAutosMain
            },
            {
              path: "/vendor/manageServices",
              component: manageServicesMain
            },
            {
              path: "/vendor/manageExports",
              component: manageExportsMain
            }
          ]
        },
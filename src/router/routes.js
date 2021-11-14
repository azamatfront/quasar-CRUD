const routes = [
  {
    path: "/",
    component: () => import("layouts/Layout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PageProduct.vue")
      },
      {
        path: "/settings",
        component: () => import("pages/PageSettings.vue")
      },
      {
        path: "/info",
        component: () => import("pages/PageInfo.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

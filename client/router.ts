import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/Home/HomePage.vue";
import AuthedHomePage from "./components/Home/AuthedHomePage.vue";
import AboutPage from "./components/About/AboutPage.vue";
import ItemPage from "./components/Item/ItemPage.vue";
import ProfilePage from "./components/User/ProfilePage.vue";
import ListNewItemPage from "./components/Item/ListNewItemPage.vue";
import SettingsPage from "./components/User/SettingsPage.vue";
import LoginPage from "./components/User/LoginPage.vue";
import NotFound from "./NotFound.vue";
import FeedPage from "./components/Home/FeedPage.vue";
import EntryComponent from "./components/Item/EntryComponent.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/item/:id", name: "Item", component: ItemPage },
  { path: "/profile/:id", name: "Profile", component: ProfilePage },
  { path: "/new", name: "List new item", component: ListNewItemPage },
  { path: "/settings", name: "Settings", component: SettingsPage },
  { path: "/login", name: "Login", component: LoginPage },
  { path: "/items", name: "Feed", component: AuthedHomePage },
  { path: "*", name: "Not Found", component: NotFound },
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === "Login" && router.app.$store.state.username) {
      next({ name: "Account" }); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if (to.name === "Account" && !router.app.$store.state.username) {
      next({ name: "Login" }); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;

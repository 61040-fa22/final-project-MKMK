import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created () {

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDDOGSie8MgknKtCTs25nRDJx0jZ4PQxBI",
      authDomain: "mkmk-9dec9.firebaseapp.com",
      projectId: "mkmk-9dec9",
      storageBucket: "mkmk-9dec9.appspot.com",
      messagingSenderId: "352306624198",
      appId: "1:352306624198:web:4ba82e8df6b74b6e4709c7",
      measurementId: "G-609C9FCHF8"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    }
}).$mount('#app');

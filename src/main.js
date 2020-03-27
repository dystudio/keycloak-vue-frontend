// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import VueRouter from 'vue-router'
import axios from 'axios'

/* eslint-disable */
Vue.use(VueRouter);
// Vue.config.productionTip = false
const router = new VueRouter({
  mode: 'history',
  routes: routers
})

Vue.prototype.$axios = axios

let _keycloak = null;
//let _authz = null;
_keycloak = Keycloak({
  url: "http://124.93.26.52:63156/auth",
  realm: "poc",
  clientId: "hello-world",
  credentials: {
          secret: "ed8acd27-c347-4af8-9f48-5ea31da049fe"
  }
});

_keycloak
  .init({ onLoad: "login-required" })
  .success(function (authenticated) {
    //alert(authenticated ? 'authenticated' : 'not authenticated');
    if (!authenticated) {
      alert("not authenticated");
    } else {
      _keycloak.loadUserInfo().success(data => {
        //将返回的token存储到localstorage中，并作为发后端请求传递的token
        console.log(_keycloak);
        console.log(_keycloak.token);
        console.info("data is", data);
        localStorage.setItem("sso-token", _keycloak.token);
        this.loggedIn = true;
      });
    }
  })
  .error(function () {
    alert("failed to initialize");
  });
  Vue.prototype.$keycloak = _keycloak
  // Vue.use(KeycloakAuthorization);
  // _authz = new KeycloakAuthorization(_keycloak);
  // _authz.entitlement("hello-world").then(function(rpt) {
  //   console.log(rpt);
  // });
    // _authz = new KeycloakAuthorization(_keycloak);

    // _authz.init();
    // _authz.entitlement("hello-world").then(function (rpt) {
    //   console.log(rpt);
    // });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})

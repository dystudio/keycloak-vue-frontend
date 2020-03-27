<template>

  <div class="hello">
    <button @click="getToken">确认</button>

    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li class="nav-item">
  <router-link class="nav-link" to="/blog">Blog</router-link>
</li>
<li class="nav-item">
  <router-link class="nav-link" to="/services">Services</router-link>
 </li>
<li class="nav-item">
   <router-link class="nav-link" to="/contact">contact</router-link>
 </li>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import "./keycloak";
import "./keycloak-authz";
import "../main";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods:{
    getToken: function() {
        this.auth.entitlement("hello-world").then(function (rpt) {
        console.log("rpt output");
        console.log(rpt);
     });
    }
  },
  created() {
    this.$axios({
      method: "get",
      url: "https://spring-boot-demo-helloworld.apps.dhccloud.com.cn/hello",
      headers: {
        "Authorization": "BEARER " + localStorage.getItem("sso-token")
      },
    }).then(function(res) {
      console.log(res.data,"success!");
      console.log(this.$keycloak);
      this.auth = new KeycloakAuthorization(this.$keycloak);
      console.log(this.auth);
    //   this.auth.entitlement("hello-world").then(function (rpt) {
    //     console.log("rpt output");
    //     console.log(rpt);
    //  });
    }.bind(this)).catch(function(res) {
      console.log(res);
      //alert('登录异常，请重新登录!');
    }.bind(this));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

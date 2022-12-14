

<template>
  <header>
  <div style="display:flex">
      <!--Nav when signed in-->
      <nav class="nav-buttons" v-if="$store.state.username">

        <router-link to="/">
        <!-- TO DO: Fix route here -->
        <span class="nav-item"> All Items </span >
        </router-link>
        <router-link to="/feed">
          <div class="nav-item"> Feed</div >
        </router-link>
        <div @click="logoutCallback">Log Out</div>


      </nav>
      <!--Nav when not signed in-->
      <nav v-else>
        <router-link to="/about">
          About
        </router-link>
        <router-link to="/login">
          Log in
        </router-link>
      </nav>
  </div>
  </header>

</template>

<script>
import ApiButton from '@/components/util/ApiButton.vue';
import LogoComponent from '@/components/common/LogoComponent.vue';
import IconVue from '../util/Icon.vue';

export default {
  name: 'MainMenu',
  components: {
    ApiButton,
    LogoComponent, 
    IconVue
  },
  methods: {
    async logoutCallback() {
      const r = await fetch(`/api/users/session`, {method: 'DELETE'});
      const res = await r.json().then( ()=>{
        this.$store.state.username = null;
        this.$store.state.requests = [];
        this.$store.state.handoffs = [];
        this.$store.state.items = [];
        this.$store.state.entries = [];
        this.$store.commit('alert', {
        message: 'You are now logged out',
        status: 'success'
        })
        this.$router.push({name: 'Home'});
    });
    }
  }
};
</script>

<style>
header {
  /* display: flex; */
  justify-content: space-between;
  /* align-items: right; */

}

nav {
  display: flex;
  gap: 1rem;
  justify-content: space-evenly;
  text-align: center;
  width: 100vh;
  padding-left:45px;
  padding-bottom:15px;
  border-bottom: 1px solid rgba(179, 179, 179, 0.541);

}
.nav-item {
/* NEEDS STYLING like the tabs  */
}
</style>
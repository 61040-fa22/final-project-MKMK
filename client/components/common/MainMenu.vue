

<template>
  <header>
  <div style="display:flex">
      <LogoComponent style="padding:10px"/>
      <!--Nav when signed in-->
      <nav class="nav-buttons" v-if="$store.state.username" style="padding: 15px">

        <router-link to="/">
        <!-- TO DO: Fix route here -->
          <button> All Items </button >
        </router-link>
        <router-link to="/feed">
          <button > Feed</button >
        </router-link>
        <router-link :to="`/profile/${$store.state.username}`">
            <button>My Profile</button >
        </router-link>
        <ApiButton
          title="Log out"
          url="/api/users/session"
          method="DELETE"
          set-username
          :callback="logoutCallback"
          style="width:100%"
          class="user-button"
        />
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

export default {
  name: 'MainMenu',
  components: {
    ApiButton,
    LogoComponent
  },
  methods: {
    logoutCallback() {
      this.$store.commit('alert', {
        message: 'You are now logged out',
        status: 'success'
      });
      this.$router.push({name: 'Home'});
    }
  }
};
</script>

<style>
header {
  /* display: flex; */
  justify-content: space-between;
  align-items: right;
}

nav {
  display: flex;
  gap: 1rem;
  float: right;

  /* border-bottom: 1px solid grey; */
}
.nav-buttons {
  /* padding:15px;  */
  text-align: right;
}
</style>
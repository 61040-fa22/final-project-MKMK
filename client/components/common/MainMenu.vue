

<template>
  <header>
  <div style="display:flex">
      <!--Nav when signed in-->
      <nav class="nav-buttons" v-if="$store.state.username" style="">

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
          style="width:max-content; float: right;"
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
  /* align-items: right; */

}

nav {
  display: flex;
  gap: 1rem;
  width: 100vh;
  padding-left:45px;
  padding-bottom:15px;
  border-bottom: 1px solid rgba(179, 179, 179, 0.541);

}
.nav-buttons {
  /* padding:15px;  */
  /* text-align: right; */
}
</style>
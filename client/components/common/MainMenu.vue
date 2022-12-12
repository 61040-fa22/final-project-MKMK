<template>
  <header>
    <LogoComponent />
    <!--Nav when signed in-->
    <nav v-if="$store.state.username">
      <router-link :to="`/profile/${$store.state.username}`">
        My Profile
      </router-link>
      <router-link to="/new">
        List New Item
      </router-link>
      <ApiButton
        title="Log out"
        url="/api/users/session"
        method="DELETE"
        set-username="true"
        :callback="logoutCallback"
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  gap: 1rem;
}
</style>
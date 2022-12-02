<template>
  <header>
    <LogoComponent />
    <!--Nav when signed in-->
    <nav v-if="$store.state.username">
      <router-link :to="`/profile/${$store.state.username}`">
        My Profile
      </router-link>
      <router-link to="/not_implemented_yet">
        My Group
      </router-link>
      <router-link to="/new">
        List New Item
      </router-link>
      <router-link to="">
        Log out
      </router-link>
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
import LogoComponent from '@/components/common/LogoComponent.vue';

export default {
  name: 'MainMenu',
  components: {
    LogoComponent
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
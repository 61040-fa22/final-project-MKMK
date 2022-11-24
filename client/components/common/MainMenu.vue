<template>
  <header>
    <LogoComponent />
    <!--Nav when signed in-->
    <nav v-if="$store.state.username">
      <router-link to="/profile">
        Profile
      </router-link>
      <router-link to="">
        Groups
      </router-link>
      <router-link to="">
        Items
      </router-link>
    </nav>
    <!--Nav when not signed in-->
    <nav v-else>
      <router-link to="/about">
        About
      </router-link>
      <router-link to="/login">
        Login
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
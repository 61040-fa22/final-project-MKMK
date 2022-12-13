<template>
  <router-link
    to="/"
    class="logo_container"
  >
    <Icon
      src="/icons/heart.svg"
      size="36"
    />
    <h1 style="color: #81B29A">BeLender</h1>
  </router-link>
</template>

<script>
import Icon from '@/components/util/Icon.vue';

export default {
  name: 'LogoComponent',
  components: {
    Icon
  }
};
</script>

<style scoped>
.logo_container {
  display: flex;
  align-items: center;
  gap: 0.75em;
}

a {
  text-decoration: none;
  color:  #3D405B;
}
</style>


<template>
      <div v-if="$store.state.username" class="left">
        <router-link :to="`/profile/${$store.state.username}`">
            <button>My Profile</button >
        </router-link>
        <router-link to="/new">
          <button> New Item </button >
        </router-link>
        <router-link to="/new">
          <button> All Items </button >
        </router-link>
      </div>

</template>

<script>
import ApiButton from '@/components/util/ApiButton.vue';
import LogoComponent from '@/components/common/LogoComponent.vue';
import IconVue from '../util/Icon.vue';

export default {
  name: 'LeftNav',
  components: {
    ApiButton,
    LogoComponent, 
    IconVue
  },
  methods: {
    logoutCallback() {
      this.$store.commit('alert', {
        message: 'You are now logged out',
        status: 'success'
      });
      this.$router.push({name: 'LeftNav'});
    }
  }
};
</script>

<style>


.left {
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  padding-right: 25px;
  /* padding-left: 0px; */
  gap: 2rem;
  max-width: 228px;
  border-right: 1.5px solid rgb(179, 179, 179);
  border-top: 1.5px solid rgba(107, 107, 107, 0.479);
  border-radius: 0px 5px 0px 0px ;
  text-align: center;
  width:max-content;
  height: 100vh;
  float: left;
}
</style>
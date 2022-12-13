

<template>
    <div v-if="$store.state.username" class="outer">
      <div class="left">
        <LogoComponent style="padding:10px"/>
        <router-link :to="`/profile/${$store.state.username}`">
            <div >
            <img src="https://via.placeholder.com/150x150" style="width: 120px; max-width: 150px;">
            <h2> {{this.$store.state.username}} </h2>
            <button style="">My Profile</button >
            </div>
        </router-link>
        <router-link to="/new">
          <button> New Item </button >
        </router-link>

      </div>
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
    IconVue, 
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

.outer {
  border-right: 1px solid rgba(179, 179, 179, 0.541);
  width: 240px;
  height: 100vh;
  float:left;
}

.left {
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  padding-right: 15px;
  height: 250px;
  /* padding-left: 0px; */
  gap: 2rem;
  text-align: center;
  /* float: left; */
  justify-content: space-between;
  /* margin-left: 15px; */
}
</style>
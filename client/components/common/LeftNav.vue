

<template>
    <div v-if="$store.state.username" class="outer">
      <div class="left">
        <LogoComponent style="padding:10px"/>
        <router-link :to="`/profile/${$store.state.username}`">
            <div >
            <img ref="imageData" src="https://via.placeholder.com/150x150" style="width: 100px; max-width: 150px; border-radius:75px">
            <h2> {{this.$store.state.username}} </h2>
            </div>
        </router-link>
        <router-link to="/new">
          <button> Add New Item </button >
        </router-link>
                <router-link :to="`/profile/${$store.state.username}`">
            <button>My Profile</button >
        </router-link>
        <div class="left-item" style="border:0px" @click="logoutCallback">Log Out</div>
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
  async mounted (){
    const r = await fetch(`/api/users/session`);
    if (r.ok) {
      const res = await r.json();
      console.log(res.user);
      this.user = res.user;
      setTimeout(() => {
        this.$refs["imageData"].src = this.user.imageRef;
      }, 0)
    };
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
  gap: 1rem;
  text-align: center;
  /* float: left; */
  justify-content: space-between;
  /* margin-left: 15px; */
}
</style>
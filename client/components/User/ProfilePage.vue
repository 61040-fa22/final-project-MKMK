<template>
  <main>
    <h2>page for profile {{ $route.params.id }}</h2>
    <img src="https://via.placeholder.com/150x150">

    <div
      v-if="(user.username === $store.state.username)"
    >
      <h2>My Info</h2>
      <UserRequests 
        :user="user"
        :owner="true"
      />
      <UserRequests 
        :user="user"
        :owner="false"
      />
    </div>
  </main>
</template>

<script>
import UserRequests from "@/components/Request/UserRequests.vue";
export default {
  name: "ProfilePage",
  components: {UserRequests},
  data (){
    return{
      user: Object,
    }
  },
  async mounted () {
    this.$store.commit('refreshRequests');
    const r = await fetch(`/api/users/${this.$route.params.id}`);
    if (r.ok) {
      const res = await r.json();
      this.user = res.user;
    }
  }
};
</script>

<style scoped>
</style>
<template>
  <main class="page_container">
    <h2>Profile: @{{ $route.params.id }}</h2>
    <p v-if="isMe">
      <router-link :to="{name: 'Settings'}">
        Settings
      </router-link>
    </p>
    <img src="https://via.placeholder.com/150x150">
    <div>
      <h2>Items</h2>
      <GalleryComponent num-columns=4>
        <ItemCard
          v-for="item in items"
          :key="item._id"
          :item-id="item._id"
        />
      </GalleryComponent>
    </div>
    <div v-if="isMe">
      <h2>My Info</h2>
      <UserRequests 
        :user="user"
        :owner="true"
      />
      <br><br>
      <UserRequests 
        :user="user"
        :owner="false"
      />
      <br><br>
      <UserHandoffs
        :user="user"
        :owner="true"
      />
      <br><br>
      <UserHandoffs
        :user="user"
        :owner="false"
      />
    </div>
  </main>
</template>

<script>
import UserRequests from "@/components/Request/UserRequests.vue";
import ItemCard from "@/components/Item/ItemCard.vue";
import GalleryComponent from "@/components/util/GalleryComponent.vue";
import UserHandoffs from "@/components/Handoff/UserHandoffs.vue";

export default {
  name: "ProfilePage",
  components: {UserRequests, ItemCard, GalleryComponent, UserHandoffs},
  data (){
    return {
      user: Object,
    }
  },
  computed: {
    items() {
      return this.$store.state.items.filter(item => item.owner === this.$route.params.id);
    },
    isMe() {
      return this.$store.state.username === this.$route.params.id;
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
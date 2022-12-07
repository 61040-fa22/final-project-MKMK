<template>
  <main>
    <h2>page for profile {{ $route.params.id }}</h2>
    <img src="https://via.placeholder.com/150x150">
    <div
      v-if="(user.username === $store.state.username)"
    >
      <h2>Your Info</h2>
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
    <div>
      <h2
        v-if="(user.username === $store.state.username)"
      > Your Items
      </h2>
      <h2
        v-else>
      {{ user.username}}'s Items
      </h2>
      <GalleryComponent num-columns=4>
        <ItemCard
          v-for="item in $store.state.items.filter(item => item.owner === user.username)"
          :itemId="item._id"
        />
      </GalleryComponent>
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
<template>
  <main class="page_container" style="padding-left:25px">

    <div class="profile_header">
      <section>
        <img class="profPic" ref="imageData" src="https://via.placeholder.com/150x150">
      </section>
      <section>
        <h2>@{{ $route.params.id }}</h2>
        <p class="indent">Joined in {{ date() }}</p>
        <br><br>
        <!-- <p> *INSERT RATING HERE* </p> -->
      </section>
      <section v-if="isMe">
        <router-link
          to="/settings"
          class="logo_container"
        >
          <Icon
            src="/icons/gear.png"
            size="30"
          />
        </router-link>
      </section>
    </div>
    <br><hr><br>

    <div class='wrapper' v-if="isMe">
      <tabs>
        <tab title="Incoming Requests">
          <UserRequests 
            :user="user"
            :owner="true"
          /></tab>
        <tab title="Outgoing Requests">
          <UserRequests 
            :user="user"
            :owner="false"
          />
        </tab>
        <tab title="Current Lends">
          <UserHandoffs
            :user="user"
            :owner="true"
          />
        </tab>
        <tab title="Current Borrows">
          <UserHandoffs
            :user="user"
            :owner="false"
          />
        </tab>
        <tab title="My Items">
          <GalleryComponent num-columns=4>
            <ItemCard
              v-for="item in items"
              :key="item._id"
              :item-id="item._id"
            />
          </GalleryComponent>
        </tab>
      </tabs>
    </div>

    <div v-if="!isMe">
      <h2>Items</h2>
      <GalleryComponent>
        <ItemCard
          v-for="item in items"
          :key="item._id"
          :item-id="item._id"
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
import Icon from '@/components/util/Icon.vue';
import Tab from '../common/Tab.vue'
import Tabs from '../common/Tabs.vue'

export default {
  name: "ProfilePage",
  components: {UserRequests, ItemCard, GalleryComponent, UserHandoffs, Icon, Tab, Tabs},
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
    setTimeout(() => {
      this.$refs["imageData"].src = this.user.imageRef;
    }, 0)
  },
  methods: {
    date() {
      return this.user.dateJoined.split(' ')[2].split(',')[0];
    }
  }
};
</script>

<style scoped>
  .profile_header {
  display: grid;
  grid-template-columns: 3fr 6fr 1fr;
  padding-top:45px;
  }
  .logo_container {
    display: flex;
    align-items: center;
    gap: 0.75em;
  }
  .wrapper {
      width: 100%;
      min-height: 100vh;
      background-color: #f8f8f800;
      margin: 0;
      padding: 20px;
    }

  .profPic {
      width: 150px;
  }
</style>

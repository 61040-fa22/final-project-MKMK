<template>
  <main class="page_container">
    <div class="item_header">
      <section>
        <img ref="itemImage" src="https://via.placeholder.com/150x150">
      </section>
      <section>
        <div class="row">
          <h2 class="title">{{ item.name }}</h2>  
          <DotsMenu v-if="ownerIsMe">
            <DeleteItemButton :item="item" />
          </DotsMenu>
        </div>
        <p class="owner">
          owned by <router-link :to="{ name: 'Profile', params: {id: item.owner}}">
            @{{ item.owner }}
          </router-link>
        </p>
        <br>
        <p class="description">{{ item.description }}</p>
      </section>
    </div>

    <div class="interaction">
      <button v-if="canPost" @click="entry()" class="item_button">
        WRITE DIARY ENTRY
      </button><br>
      <div v-if="showEntry">
        <WriteDiaryPostForm :item-id="$route.params.id" />
      </div>
      <button v-if="!canPost" @click="borrow()" class="item_button">
        REQUEST TO BORROW
      </button><br>
      <div v-if="showBorrow">
        <RequestToBorrowForm :item-id="$route.params.id" />
      </div>
    </div>

    <section>
      <DiaryFeed :item="item" />
    </section>
  </main>
</template>

<script>
import DeleteItemButton from "@/components/Item/DeleteItemButton.vue";
import DiaryFeed from "@/components/Item/DiaryFeed.vue";
import DotsMenu from "@/components/util/DotsMenu.vue";
import RequestToBorrowForm from "@/components/Item/RequestToBorrowForm.vue";
import WriteDiaryPostForm from "@/components/Item/WriteDiaryPostForm.vue";

export default {
  name: "ItemPage",
  components: {
    DeleteItemButton,
    DiaryFeed,
    DotsMenu,
    RequestToBorrowForm,
    WriteDiaryPostForm
  },
  data() {
    return {
      showBorrow: false,
      showEntry: false
    }
  },
  computed: {
    item() {
      return this.$store.state.items.filter(
        item => item._id === this.$route.params.id
      )[0];
    },
    ownerIsMe() {
      return this.item.owner === this.$store.state.username;
    },
    canPost() {
      const handoffs = this.$store.state.handoffs
      const isBorrowing = handoffs.filter(handoff => handoff.itemId === this.item._id).length;
      return (this.item.owner === this.$store.state.username) || isBorrowing;
    }
  },
  mounted () {
    if (this.item.imageRef) {
      this.$refs["itemImage"].src = this.item.imageRef;
    }
  },
  methods: {
    borrow() {
      this.showBorrow = !this.showBorrow
    },
    entry() {
      this.showEntry = !this.showEntry
    }
  }
};
</script>

<style scoped>
section {
  margin-bottom: 3rem;
}
img {
  width: 150px;
}
.item_header {
  display: grid;
  grid-template-columns: 3fr 6fr 1fr;
  margin-top: 25px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.description {
  font-style: oblique;
  font-size: x-large;
}
.owner {
  font-variant:small-caps;
}
.interaction {
  display:block;
}
.item_button {
  min-width: 30%;
  display: flex;
  justify-content: center;
}
</style>
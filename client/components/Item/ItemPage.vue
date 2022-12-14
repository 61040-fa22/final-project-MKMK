<template>
  <main class="page_container">
    <div class="item_header">
      <section>
        <img ref="itemImage" src="https://via.placeholder.com/150x150">
      </section>
      <section>
        <h2 class="title">{{ item.name }}</h2>
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
      <!-- <svg>
        <rect width="100%" height="50" style="fill:none;stroke:blue"/>
      </svg>   -->
      <!--
        REPLACE ABOVE SVG WITH:
        if user is the owner or a current borrower,
          <BorrowButton>
        else
          <WriteDiaryEntryButton>

        this way, the immediate next thing on the page is diary entries.
      -->
    </div>

    <section v-if="!ownerIsMe">
      <RequestToBorrowForm :item-id="$route.params.id" />
    </section>
    <section>
      <WriteDiaryPostForm :item-id="$route.params.id" />
    </section>
    <section>
      <DiaryFeed :item="item" />
    </section>
  </main>
</template>

<script>
import DeleteItemButton from "@/components/Item/DeleteItemButton.vue";
import DiaryFeed from "@/components/Item/DiaryFeed.vue";
import RequestToBorrowForm from "@/components/Item/RequestToBorrowForm.vue";
import WriteDiaryPostForm from "@/components/Item/WriteDiaryPostForm.vue";

export default {
  name: "ItemPage",
  components: {
    DeleteItemButton,
    DiaryFeed,
    RequestToBorrowForm,
    WriteDiaryPostForm
  },
  computed: {
    item() {
      return this.$store.state.items.filter(
        item => item._id === this.$route.params.id
      )[0];
    },
    ownerIsMe() {
      return this.item.owner === this.$store.state.username;
    }
  },
  mounted () {
    if (this.item.imageRef) {
      this.$refs["itemImage"].src = this.item.imageRef;
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
.description {
  font-style: oblique;
  font-size: x-large;
}
.owner {
  font-variant:small-caps;
}
.interaction {
  display:flex;
  justify-content: center;
  text-align: center;
}
</style>
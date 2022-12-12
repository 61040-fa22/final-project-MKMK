<template>
  <main class="page_container">
    <section>
      <h2>
        {{ item.name }}
      </h2>
      <p>
        Owned by <router-link :to="{ name: 'Profile', params: {id: item.owner}}">
          @{{ item.owner }}
        </router-link>
      </p>
      <img src="https://via.placeholder.com/150x150">
      <p>
        {{ item.description }}
      </p>
    </section>
    <section>
      <RequestToBorrowForm :item-id="$route.params.id" />
    </section>
    <section>
      <WriteDiaryPostForm />
    </section>
    <section>
      <DiaryFeed :item="item" />
    </section>
  </main>
</template>

<script>
import DiaryFeed from "@/components/Item/DiaryFeed.vue";
import RequestToBorrowForm from "@/components/Item/RequestToBorrowForm.vue";
import WriteDiaryPostForm from "@/components/Item/WriteDiaryPostForm.vue";

export default {
  name: "ItemPage",
  components: {
    DiaryFeed,
    RequestToBorrowForm,
    WriteDiaryPostForm
  },
  computed: {
    item() {
      return this.$store.state.items.filter(
        item => item._id === this.$route.params.id
      )[0];
    }
  }
};
</script>

<style scoped>
section {
  margin-bottom: 3rem;
}
</style>
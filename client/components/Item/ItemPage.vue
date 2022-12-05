<template>
  <main>
    <h2>
      {{ item.name }}
    </h2>
    <img src="https://via.placeholder.com/150x150">
    <br><br>
    <p>
      {{ item.description }}
    </p>
    <br><br>

    <RequestToBorrowForm
      :itemId="$route.params.id" 
    />

    <WriteDiaryPostForm />
    <DiaryFeed 
      :item="item"
    />
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
  data () {
    return {
      item: this.$store.state.items.filter(item => item._id === this.$route.params.id)[0]
    }
  }
};
</script>

<style scoped>
</style>
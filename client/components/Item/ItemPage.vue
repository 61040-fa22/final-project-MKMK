<template>
  <main>
    <h2>
      Item {{ $route.params.id }}
    </h2>
    <img src="https://via.placeholder.com/150x150">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p>
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
    <p>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <RequestToBorrowForm />

    <WriteDiaryPostForm />
    <DiaryFeed />
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
  }
};
</script>

<style scoped>
</style>
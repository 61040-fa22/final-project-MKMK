<template>
  <section>
    <h3>Item Diary</h3>

    <DiaryPost />
    <DiaryPost />
    <DiaryPost />
    <DiaryPost />
    <DiaryPost />
    <DiaryPost />
    <DiaryPost />
    <DiaryPost />
  </section>
</template>

<script>
import DiaryPost from "@/components/Item/DiaryPost.vue";

export default {
  name: "DiaryFeed",
  components: {
    DiaryPost
  }
}
</script>

<style scoped></style>
<template>
  <section>
    <h3>Item Diary</h3>

    <DiaryPost 
      v-for="entry in $store.state.entries.filter(entry => entry.itemId === item._id)"
      :entry="entry"
    />

  </section>
</template>

<script>
import DiaryPost from "@/components/Item/DiaryPost.vue";

export default {
  name: "DiaryFeed",
  components: {
    DiaryPost
  },
  props: {
    item: {
      type: Object, 
      required: true
    }
  },
  mounted(){
    this.$store.commit('refreshEntries')
  }
}
</script>

<style scoped></style>
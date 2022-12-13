<template>
  <section>
    <h3>Item Diary</h3>
    <div v-if="entries.length">
      <DiaryPost
        v-for="entry in entries"
        :key="entry._id"
        :entry="entry"
      />
    </div>
    <div v-else>
    </div>
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
  computed: {
    entries() {
      return this.$store.state.entries.filter(entry => entry.itemId === this.item._id);
    }
  },
  mounted() {
    this.$store.commit('refreshEntries');
  },
}
</script>

<style scoped></style>
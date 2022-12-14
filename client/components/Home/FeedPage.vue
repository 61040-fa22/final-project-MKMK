<template>
  <main class="feed">
      <!-- <EntryComponent :content="entry.content" :author="entry.author"/> -->
    <p style="font-size:30px"> Item Diary Entries  </p> 
    <EntryComponent
          v-for="entry in entries"
          :key="entry._id"
          :content="entry.content"
          :author="entry.author"
          :date="entry.dateCreated"
          :itemId="entry.itemId"
        />
  </main>
</template>

<script>
import EntryComponent from "@/components/Item/EntryComponent.vue";

export default {
  name: "FeedPage",
  components: {
    EntryComponent
  },
  computed: {
    entries() {
      return this.$store.state.entries;
    },
}}
</script>

<style scoped>
.feed {
  display: flex;
  flex-direction: column;
  gap: 1rem;;
  margin: 10px 0px 0px 10px;
}
</style>
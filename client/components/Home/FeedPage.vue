<template>
  <main class="feed page_content">
    <EntryComponent
          v-for="entry in entries"
          :entry="entry"
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
  gap: 1rem;
}
</style>
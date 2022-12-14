<template>
  <div>
    <ApiButton
      title="Delete diary entry"
      :url="`/api/entries/${entry._id}`"
      method="DELETE"
      :callback="deleteEntryCallback"
    />
  </div>
</template>

<script>
import ApiButton from "@/components/util/ApiButton.vue";

export default {
  name: "DeleteDiaryPostButton",
  components: {
    ApiButton
  },
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteEntryCallback(res) {
      this.$store.commit('alert', {
        message: res.message,
        status: 'success'
      });
      this.$store.commit('refreshEntries');
    }
  }
}
</script>

<style scoped>
</style>
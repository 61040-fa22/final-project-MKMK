<template>
  <div>
    <ApiButton
      title="Delete item"
      :url="`/api/items/${item._id}`"
      method="DELETE"
      :callback="deleteItemCallback"
    />
  </div>
</template>

<script>
import ApiButton from "@/components/util/ApiButton.vue";

export default {
  name: "DeleteItemButton",
  components: {
    ApiButton
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteItemCallback(res) {
      this.$store.commit('alert', {
        message: res.message,
        status: 'success'
      });
      this.$store.commit('refreshItems');
      this.$router.push({name: 'Home'});
    }
  }
}
</script>

<style scoped>
</style>
<template>
  <section
    v-if="$store.state.requests.length"
  >
    <h2>Requests to You</h2>
    <RequestCard
      v-for="request in $store.state.freets.filter(request => request.owner === user.username)"
      :key="request.id"
      :request="request"
    />
  </section>
  <section
    v-else
  >
    <h2>No requests to you (yet!)</h2>
  </section>
</template>

<script>
import RequestCard from "@/components/Request/RequestCard.vue";
export default {
    name: "RequestsTo",
    components: {RequestCard},
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.$store.commit('refreshRequests');
    },
    methods: {
    }
  }
</script>
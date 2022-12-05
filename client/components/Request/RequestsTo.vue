<template>
  <section
    v-if="owner"
  >
    <section
      v-if="$store.state.requests.filter(request => request.owner === user.username).length"
    >
      <h2>Requests to You</h2>
      <RequestCard
        v-for="request in $store.state.requests.filter(request => request.owner === user.username)"
        :key="request.id"
        :request="request"
        :owner="true"
      />
    </section>
    <section
      v-else
    >
      <h2>No requests to you (yet!)</h2>
    </section>
  </section>
  <section
    v-else
  >
    <section
      v-if="$store.state.requests.filter(request => request.borrower === user.username).length"
    >
      <h2>Requests from You</h2>
      <RequestCard
        v-for="request in $store.state.requests.filter(request => request.borrower === user.username)"
        :key="request.id"
        :request="request"
        :owner="false"
      />
    </section>
    <section
      v-else
    >
      <h2>No requests from you (yet!)</h2>
    </section>
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
        },
        owner: {
            type: Boolean,
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
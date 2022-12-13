<template>
  <section>
    <div
      v-if="owner"
    >
      <h3>Requests to You</h3>
      <p
        v-if="($store.state.requests.filter(request => request.owner === user.username).length === 0)"
      >
        No requests for you to approve (yet)!
      </p>
      <RequestComponent
        v-for="request in $store.state.requests.filter(request => request.owner === user.username)"
        :key="request._id"
        :request="request"
        :owner="owner"
      />
    </div>
    <div
      v-else
    >
      <h3>Requests from You</h3>
      <p
        v-if="($store.state.requests.filter(request => request.borrower === user.username).length === 0)"
      >
        You have no pending requests (yet)!
      </p>
      <RequestComponent
        v-for="request in $store.state.requests.filter(request => request.borrower === user.username)"
        :key="request._id"
        :request="request"
        :owner="owner"
      />
    </div>
  </section>
</template>

<script>
import RequestComponent from "@/components/Request/RequestComponent.vue";
export default {
    name: "UserRequests",
    components: {RequestComponent},
    props: {
        user: {
            type: Object,
            required: true
        },
        owner: {
            type: Boolean,
            require: true
        }
    },
    mounted() {
        this.$store.commit('refreshRequests');
    }
  }
</script>
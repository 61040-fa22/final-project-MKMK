<template>
  <section>
    <div
      v-if="owner"
    >
      <h3>Requests to You</h3>
      <RequestComponent
        v-for="request in $store.state.requests.filter(request => request.owner === user.username)"
        :request="request"
        :owner="owner"
      />
    </div>
    <div
      v-else
    >
      <h3>Requests from You</h3>
      <div
        v-for="request in $store.state.requests.filter(request => request.borrower === user.username)"
      >
        <RequestComponent
          :request="request"
          :owner="owner"
        />
        <br>
      </div>
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
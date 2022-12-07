<template>
  <section
  >
    <div
      v-if="owner"
    >
    <h3>{{ request.borrower }} requested {{ request.item }} from you </h3>
    <button
     @click="accept(true)"
     >
     Accept  
    </button>
    <button
     @click="accept(false)"
     >
     Reject  
    </button>
    </div>

    <div
      v-else
    >
      <h3>You requested {{ request.item }} from {{ request.owner }} </h3>
      <button
       @click="deleteRequest()"
       >
        Delete This Request
      </button>
    </div>
    <h3>{{ request.startDate}} -> {{ request.endDate }}</h3>
  </section>
</template>
<script>
  export default {
    name: "RequestComponent",
    props: {
        owner: {
            type: Boolean,
            required: true
        },
        request: {
            type: Object,
            required: true
        }
    },
    mounted () {
      console.log(request);
    },
    methods: {
      async deleteRequest() {
        try{
            const r = await fetch(`api/requests/${this.request._id}`, {method: 'DELETE'});
            if (!r.ok) {
                const res = await r.json();
                throw new Error(res.error);
            }
            this.$store.commit('alert', {
                message: 'Successfully deleted the request.',
                status: 'success'
            });
            this.$store.commit('refreshRequests');
            console.log(this.$store.requests);
          } catch (e) {
            this.$set(this.alerts, e, 'error');
            setTimeout(() => this.$delete(this.alerts, e), 3000);
          }
      },
      async accept(accepted) {       
        try{
            const r = await fetch(`api/requests/accept/${this.request._id}`, {method: 'PATCH', headers: {'Accept': 'application/json','Content-Type': 'application/json'}, body: JSON.stringify({accept: accepted})});
            if (!r.ok) {
                console.log('uh oh');
                const res = await r.json();
                throw new Error(res.error);
            }
            this.$store.commit('alert', {
                message: 'Successfully responded to the request.',
                status: 'success'
            });
            this.$store.commit('refreshRequests');
            console.log(this.request._id);
            const r2 = await fetch(`api/handoffs/`, {method: 'POST', headers: {'Accept': 'application/json','Content-Type': 'application/json'}, body: JSON.stringify({requestId: this.request._id})});
            if (!r.ok) {
              console.log('uh oh');
                const res = await r.json();
                throw new Error(res.error);
            };
            this.$store.commit('refreshHandoffs');
          } catch (e) {
            this.$set(this.alerts, e, 'error');
            setTimeout(() => this.$delete(this.alerts, e), 3000);
          }

      }

    }
  }
</script>
<style scoped>
  section {
    border-style: solid;
    border-width: 2px;
    border-color: black;
    border-radius: 5px;
    margin: 7px;
  }
  button {
    padding: 5px;
    border-style: solid;
    border-width: 2px;
  }
</style>
<template>
  <section>
    <h3
      v-if="((request.startDate.getTime() - (new Date().getTime()))/(1000 * 3600 * 24) < 3)"
    >
      EXPIRES SOON
    </h3>
    <h3
      v-if="owner"
    > 
      {{ request.borrower }} requests {{ request.item }} from you 
    </h3>
    <h3
      v-else
    >
      You requested {{ request.item }} from {{ request.owner }}
    </h3>
    <h3> for the dates {{ request.startDate }} to {{ request.endDate }}</h3>
    <br>
    <div
      v-if="owner"
    >
      <button
        class="acceptButton"
        title="Accept"
        @click="accept(true)"
      >
        Accept
      </button>
      <button
        class="rejectButton"
        title="Reject"
        @click="accept(false)"
      >
        Reject
      </button>
    </div>
    <div
      v-else
    >
      <button
        class="deleteButton"
        title="Delete"
        @click="deleteRequest"
      >
        Delete Request
      </button>
    </div>
  </section>
</template>
  
<script>

  export default {
    name: "RequestCard",
    props: {
        request: {
            type: Object,
            required: true
        },
        owner: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        async accept(acceptStatus) {
            const options = {
                method: 'PATCH',
                body: JSON.stringify({accept: acceptStatus})
            }
            try{
                const r = await fetch(`api/requests/accept${this.request._id}`, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }
                this.$store.commit('alert', {
                    message: 'Successfully ' + acceptStatus? 'accepted' : 'rejected' + 'the request.',
                    status: 'success'
                });
                this.$store.commit('refreshRequests');
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
            
        },
        async deleteRequest() {
            const options = {
                method: 'DELETE'
            }
            try{
                const r = await fetch(`api/requests/${this.request._id}`, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }
                this.$store.commit('alert', {
                    message: 'Successfully deleted the request.',
                    status: 'success'
                });
                this.$store.commit('refreshRequests');
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }

        }
    }
  }
</script>
  
<style scoped></style>
<template>
  <section>
    <h3
      v-if="((request.startDate.getTime() - (new Date().getTime()))/(1000 * 3600 * 24) < 3)"
    >
      EXPIRES SOON
    </h3>
    <h3> 
      {{ request.borrower }} requests {{ request.item }} from you 
    </h3>
    <h3> for the dates {{ request.startDate }} to {{ request.endDate }}</h3>
    <br>
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
  </section>
</template>
  
<script>

  export default {
    name: "RequestCard",
    props: {
        request: {
            type: Object,
            required: true
        }
    },
    methods: {
        accept(acceptStatus) {
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
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
            
        }
    }
  }
</script>
  
<style scoped></style>
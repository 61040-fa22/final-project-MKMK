<template>
    <section
    >
      <div
        v-if="owner"
      >
      <h3>{{ handoff.borrower }} has your {{ handoff.item }} until {{ handoff.returnDate }} </h3>
      <button
       @click="returnItem"
       >
       Mark as Returned
      </button>
      <button
       @click="problem"
       >
       Report a Problem 
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
      
    </section>
  </template>
  <script>
    export default {
      name: "HandoffComponent",
      props: {
          owner: {
              type: Boolean,
              required: true
          },
          handoff: {
              type: Object,
              required: true
          }
      },
      methods: {
        async returnItem() {
          try{
              console.log('returning');
              const r = await fetch(`api/handoffs/${this.handoff._id}`, {method: 'PATCH', headers: {'Accept': 'application/json','Content-Type': 'application/json'}});
              if (!r.ok) {
                  console.log('uh oh');
                  const res = await r.json();
                  throw new Error(res.error);
              }
              this.$store.commit('alert', {
                  message: 'Successfully marked the item as returned.',
                  status: 'success'
              });
              this.$store.commit('refreshHandoffs');
            } catch (e) {
              this.$set(this.alerts, e, 'error');
              setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        },
        problem() {
          this.$store.commit('alert', {
                  message: 'Problem has been filed with beLender and we will get back to you shortly.',
                  status: 'success'
              });
        }
  
      }
    }
  </script>
  <style scoped>
    div {
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
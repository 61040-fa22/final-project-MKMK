<template>
 <section>
    <h3
      v-if="owner"
    >
    Currently Lending
   </h3>
   <h3
     v-else
    >
      Currently Borrowing
    </h3>
    <HandoffComponent
      v-for="handoff in $store.state.handoffs.filter(handoff => handoff.startDate < new Date() && !handoff.returned)"
      :owner="owner"
      :handoff="handoff"
    />
    <p
      v-if="($store.state.handoffs.filter(handoff => owner? handoff.owner === user.username : handoff.borrower === user.username).length === 0)"
    >
      No items unreturned. 
    </p>
 </section>
</template>
<script>
  import HandoffComponent from '@/components/Handoff/HandoffComponent.vue';
  export default {
    name: "UserHandoffs",
    components: {HandoffComponent},
    props: {
        user: {
            type: Object,
            required: true
        },
        owner: {
            type: Boolean,
            required: true
        }
    }
  }
</script>
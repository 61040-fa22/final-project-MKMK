<template>
 <main>
    <div>
        <!-- <p>{{itemId}} </p> -->
    </div> 
    <div class= "post" style="display:flex-col"> 
        <div style="display:flex-row"> 
            <div style="float:left; font-size:12px; color:grey"> {{author}}</div>
            <div style="float:right; font-size:12px; color:grey"> {{date}}</div>  
             </br>
        </div> 
        <!-- <div> {{ item.name}} </div> -->
        <div class="text" style="float:left">{{content}} </div>
        <div class="item-details" style="float:right"> {{item.name}}</div>
    </div>
 </main>
</template>

<script>
export default {
  name: 'EntryComponent',
  props: {
    itemId: {
      type: Object | String,
      required: true
    }, 
    author: {
        type: String, 
        required: true
    }, 
    content: {
        type: String, 
        required: true
    }, 
    date:{
        type:Date | String,
        required: true
    }
  },
    computed: {
    item() {
      return this.$store.state.items.filter(item => item._id === this.itemId)[0];
    },
    }
}
</script>

<style scoped>
.post {
    width:auto; 
    height: auto;
    min-height: 80px;
    padding:10px;
    background:rgba(243, 243, 243, 0.589); 
    border-radius: 8px;
    border:1px solid rgb(204, 204, 204); 
    padding-bottom: 10px;
}
</style>
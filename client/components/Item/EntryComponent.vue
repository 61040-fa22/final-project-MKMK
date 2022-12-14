<template>
 <main>
    <div>
        <!-- <p>{{itemId}} </p> -->
    </div> 
    <div class= "post" style="display:flex-col"> 
        <div style="display:flex-row"> 
            <div style="float:left; font-size:12px; color:grey"> {{author}}</div>
            <div style="float:right; font-size:12px; color:grey"> {{date}}</div>  
             <br>
        </div> 
        <img id="profPic" ref="profilePic" src="https://via.placeholder.com/150x150" style="float:left"/>
        <!-- <div> {{ item.name}} </div> -->
        <div class="text" style="float:left">{{content}} </div>
        <div class="item-details" style="float:right"> {{item.name}}</div>
        <br><br>
        <img class="itemPic" ref="imageData" src="https://via.placeholder.com/150x150" style="float:right"/>
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
      const item = this.$store.state.items.filter(item => item._id === this.itemId)[0];
      setTimeout(() => {
        this.$refs["imageData"].src = item.imageRef;
      }, 0)
      return item;
    },
    async user() {
      const r = await fetch(`/api/users/${author}`);
      if (r.ok) {
        const res = await r.json();
        setTimeout(() => {
          console.log(res.user.imageRef);
          this.$refs["profilePic"].src = res.user.imageRef;
        }, 0)
      }
      
    }
  }
}
</script>

<style scoped>
img {
  width: 100px;
  margin-top: 20px;
  position:relative;
}

.text {
  margin-left: 60px;
  word-wrap: normal;
  width: 400px;
}
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
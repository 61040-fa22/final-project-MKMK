<template>
  <main>
     <div>
         <!-- <p>{{itemId}} </p> -->
     </div> 
     <div class= "post" style="display:flex-col"> 
         <div style="display:flex-row"> 
             <div style="float:left; font-size:18px; color:grey"> {{entry.author}}</div>
             <div style="float:right; font-size:12px; color:grey"> {{entry.dateCreated}}</div>  
              <br>
         </div> 
         <div class="middle">
           <img id="profPic" ref="profilePic" src="https://via.placeholder.com/150x150" style="float:left"/>
           <!-- <div> {{ item.name}} </div> -->
           <div class="text" style="float:left">{{entry.content}} </div>
 
           <div class="item-details" style="float:right"> {{item.name}}</div>
           <br><br>
           <img class="itemPic" ref="imageData" src="https://via.placeholder.com/150x150" style="float:right"/>
         </div>
         <LikeButton 
           :entry="entry"
           style="cursor:pointer;"
         />
         <!-- <p>{{likes}}</p> -->
         </div>
  </main>
 </template>
 
 <script>
 import LikeButton from '@/components/Item/LikeButton.vue';
 
 export default {
   name: 'EntryComponent',
   components: {
     LikeButton
   },
   props: {
     entry: {
       type: Object,
       required: true
     }, 
   },
   data() {
    return {
      likes: 0
    }
   },
   computed: {
     item() {
       const item = this.$store.state.items.filter(item => item._id === this.entry.itemId)[0];
       setTimeout(() => {
         this.$entry.refs["imageData"].src = item.imageRef;
       }, 0)
       return item;
     }
   },
   async mounted () {
     const r = await fetch(`/api/users/${this.entry.author}`);
     if (r.ok) {
       const res = await r.json();
       setTimeout(() => {
         console.log(res.user.imageRef);
         this.$entry.refs["profilePic"].src = res.user.imageRef;
       }, 0)
      }
      const r2 = await fetch(`/api/likes/entry/${this.entry._id}`);
     if (r2.ok) {
       const res2 = await r2.json();
       setTimeout(() => {
         console.log(res2.user.imageRef);
         this.likes = r2.length;
       }, 0)
   }
 }}
   
 </script>
 
 <style scoped>
 img {
   width: 100px;
   margin-top: 20px;
   position:relative;
 }
 
 .profPic {
   position: relative;
 }
 .itemPic {
   position: relative;
 }
 .text {
   margin-left: 60px;
   word-wrap: normal;
   width: 300px;
   position: relative;
   top: 30px;
   height: 90%;
 
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
     overflow: auto;
 }
 
 .middle{
   height:140px;
 }
 .like { 
   text-align: center;
 }
 
 </style>
 
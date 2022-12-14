<template>
  <article>
    <div class="info">
      <p>
        <router-link :to="{name: 'Profile', params: {id: entry.author}}">
          <div>
            <img class="profilePic" ref="profPic" src="https://via.placeholder.com/150x150"/>
          </div>
        </router-link>
      </p>

    </div> 
   

    <div class="content">
         <!-- @{{ entry.author }}<p style="color:grey; font-size:13px">{{ entry.dateCreated }}</p>

        <p>{{ entry.content }} </p> -->
             <div style="display:flex-row"> 
            <div style="float:left; font-size:18px; color:grey"> @{{entry.author}}</div>
            <div style="float:right; font-size:12px; color:grey"> {{entry.dateCreated}}</div>  
             <br>
        </div> 
        <div class="text" style="float:left">{{entry.content}} </div>
        <br><br>

    </div>
  </article>
</template>

<script>
export default {
  name: 'DiaryPost',
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  async mounted () {
    const r = await fetch(`/api/users/${this.entry.author}`);
    if (r.ok) {
      const res = await r.json();
      console.log(res.user);
      this.$refs["profPic"].src = res.user.imageRef;
    }
  }
}
</script>

<style scoped>
article {
  border-bottom: 1px solid #ccc;
  padding: 1.5rem 0;
}

article:last-of-type {
  border-bottom: none;
}

.profilePic {
  width: 100px;
}
.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.content {
  background: white;
  border: rgb(165, 164, 164);
  width: 71rem;
  min-height: 100px;
  border-radius:10px;
  position: relative;
  padding: 15px;
  left: 130px;
  bottom: 120px;
}
.profilePic{
      cursor: pointer;
}
</style>
<template>
  <article>
    <div class="info">
      <p>
        <router-link :to="{name: 'Profile', params: {id: entry.author}}">
          <div>
            @{{ entry.author }} <br><br>
            <img class="profilePic" ref="profPic" src="https://via.placeholder.com/150x150"/>
          </div>
        </router-link>
      </p>
      <p>{{ entry.dateCreated }}</p>
    </div>
    <div class="content">
      <p>
        {{ entry.content }}
      </p>
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
  width: 300px;
  position: relative;
  left: 150px;
  bottom: 75px;
}
</style>
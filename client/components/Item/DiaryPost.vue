<template>
  <article>
    <div class="avatar_container">
      <router-link :to="{name: 'Profile', params: {id: entry.author}}">
        <img class="avatar" ref="profPic" src="https://via.placeholder.com/150x150"/>
      </router-link>
    </div>
    <div class="info_and_content">
      <div class="info">
        <p>
          <router-link :to="{name: 'Profile', params: {id: entry.author}}">
            @{{ entry.author }}
          </router-link>
          <span class="date">{{ entry.dateCreated }}</span>
        </p>
        <DotsMenu>
          <DeleteDiaryPostButton :entry="entry" />
        </DotsMenu>
      </div>
      <div class="content">
        <p>
          {{ entry.content }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import DeleteDiaryPostButton from "@/components/Item/DeleteDiaryPostButton.vue";
import DotsMenu from "@/components/util/DotsMenu.vue";

export default {
  name: 'DiaryPost',
  components: {
    DeleteDiaryPostButton,
    DotsMenu
  },
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
  display: flex;
  gap: 1.5rem;
}

article:last-of-type {
  border-bottom: none;
}

.info_and_content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.avatar {
  width: 100px;
}

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.date {
  margin-left: 0.5rem;
}
</style>
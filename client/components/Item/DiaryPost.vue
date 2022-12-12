<template>
  <article>
    <div class="info">
      <p>
        <router-link :to="{name: 'Profile', params: {id: entry.author}}">
          @{{ entry.author }}
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

.info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
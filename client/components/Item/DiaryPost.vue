<template>
  <article>
    <div class="info">
      <p>{{ entry.author }}</p>

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

<style scoped></style>
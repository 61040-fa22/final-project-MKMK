<template>
  <div
    class="gallery"
    :style="cssProps"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'GalleryComponent',
  props: {
    numColumns: {
      type: String,
      default: '4'
    }
  },
  computed: {
    cssProps() {
      return {
        '--numColumns': this.numColumns,
      }
    }
  }
};
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(var(--numColumns), 1fr);
  gap: 1rem;
}
</style>
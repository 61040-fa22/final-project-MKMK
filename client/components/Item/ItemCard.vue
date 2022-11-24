<template>
  <article>
    <img src="https://via.placeholder.com/150x150">
    <h3>Item Name</h3>
    <div class="item_card_info">
      <p>Item Owner</p>
      <p>42 posts</p>
    </div>
    <p class="item_card_description">
      Item description dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </article>
</template>

<script>
export default {
  name: 'ItemCard',
}
</script>

<style scoped>
img {
  width: 100%;
}

p {
  font-size: 0.9rem;
}

.item_card_info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
</style>
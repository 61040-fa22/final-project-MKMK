<template>
  <article>
    <img src="https://via.placeholder.com/150x150">
    <h3>
      <router-link to="/item/item_id">
        Item Name
      </router-link>
    </h3>
    <div class="item_card_info">
      <p>
        <router-link to="/profile/owner_id">
          Item Owner
        </router-link>
      </p>
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
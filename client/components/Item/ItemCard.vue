<template>
  <article>
    <img src="https://via.placeholder.com/150x150">
    <h3>
      <router-link 
        :to="('/item/' + itemId)"
      >
        {{ item.name }}
      </router-link>
    </h3>
    <div class="item_card_info">
      <p>
        <router-link 
          :to="('/profile/' + item.owner)"
        >
          Owned by {{ item.owner }}
        </router-link>
      </p>
      <p> {{ $store.state.entries.filter(entry => entry.itemId === item._id).length}} posts</p>
    </div>
    <p class="item_card_description">
      {{ item.description }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'ItemCard',
  props: {
    itemId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      item: this.$store.state.items.filter(item => item._id === this.itemId)[0]
    }
  }
}
</script>

<style scoped>
img {
  width: 150px;
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
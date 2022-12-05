<template>
  <div>
    <CurrentItems />

    <section>
      <h2>browse items</h2>
      <GalleryComponent num-columns="4">
        <ItemCard 
          v-for="item in $store.state.items"
          :key="item._id"
          :itemId="item._id"
        />
      </GalleryComponent>
    </section>
  </div>
</template>

<script>
import CurrentItems from "@/components/Home/CurrentItems.vue";
import GalleryComponent from "@/components/util/GalleryComponent.vue";
import ItemCard from "@/components/Item/ItemCard.vue";

export default {
  name: 'AuthedHomePage',
  components: {
    CurrentItems,
    GalleryComponent,
    ItemCard
  },
  mounted() {
    this.$store.commit('refreshItems');
    // this.$store.commit('refreshEntries');
  }
};
</script>
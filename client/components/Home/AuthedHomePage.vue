<template>
  <div>
    <CurrentItems />

    <section>
      <h2>browse items</h2>
      <h3>my group: group_name</h3>
      <GalleryComponent num-columns="4">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
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
    // this.$store.commit('refreshFreets');
  }
};
</script>
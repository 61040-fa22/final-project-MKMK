<template>
  <div class="" >
    <CurrentItems />

    <div class="right-content">
      <div>
      <h2 s>browse items</h2>
      </div>
      <div>
      <GalleryComponent >
        <ItemCard 
          v-for="item in $store.state.items"
          :key="item._id"
          :item-id="item._id"
        />
      </GalleryComponent>
    </div>
    </div>
  </div>
</template>

<script>
import CurrentItems from "@/components/Home/CurrentItems.vue";
import GalleryComponent from "@/components/util/GalleryComponent.vue";
import ItemCard from "@/components/Item/ItemCard.vue";
import LeftNav from "@/components/common/LeftNav.vue";

export default {
  name: 'AuthedHomePage',
  components: {
    CurrentItems,
    GalleryComponent,
    ItemCard, 
    LeftNav
  },
  mounted() {
    this.$store.commit('refreshItems');
  }
};
</script>

<style>
/* .items {
  width: auto;
} */
.right-content{
  display: flex-col; 
  padding-top: 25px;
  padding-left: 45px;
  /* flex-direction:col; */
  /* width:100%;  */
  /* border: 1px solid green; */
  /* float:right; */

  }

</style>
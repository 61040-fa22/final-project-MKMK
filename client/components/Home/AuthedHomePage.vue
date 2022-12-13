<template>
  <div class="" >
    <CurrentItems />
    <LeftNav /> 

    <div class="right-content">
      <div>
      <h2 style="">browse items</h2>
      </div>
      <div>
      <GalleryComponent style="display:flex-row">
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
  padding-left:250px;
} */
.right-content{
  display: flex-col; 
  /* flex-direction:col; */
  width:80%; 
  /* border: 1px solid green; */
  /* float:right; */
  /* padding-left:200px; */

  }

</style>
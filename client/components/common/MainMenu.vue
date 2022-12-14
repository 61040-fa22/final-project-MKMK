

<template>
  <header>
  <div style="display:flex">
      <!--Nav when signed in-->
      <nav class="nav-buttons" v-if="$store.state.username">
        <!-- <router-link to="/">
          <span class="nav-item"> All Items </span >
        </router-link> -->
      
            <router-link to="/">
              <div class="nav-item" @click="handleClick()"> Feed </div >
            </router-link>
            <router-link to="/items">
              <div class="nav-item"> All Items</div >
            </router-link>

      </nav>
      <!--Nav when not signed in-->
      <nav v-else>
        <router-link to="/about">
          About
        </router-link>
        <router-link to="/login">
          Log in
        </router-link>
      </nav>
  </div>
  </header>

</template>

<script>
import ApiButton from '@/components/util/ApiButton.vue';
import LogoComponent from '@/components/common/LogoComponent.vue';
import IconVue from '../util/Icon.vue';

export default {
  name: 'MainMenu',
  components: {
    ApiButton,
    LogoComponent, 
    IconVue, 
  },
  methods: {

  }
};
</script>

<style>
header {
  /* display: flex; */
  justify-content: space-between;
  /* align-items: right; */

}

nav {
  display: flex;
  gap: 1rem;
  justify-content: space-evenly;
  text-align: center;
  width: 100vh;
  padding-left:45px;
  padding-bottom:15px;
  border-bottom: 1px solid rgba(179, 179, 179, 0.541);

}
.nav-item {
  color: rgba(119, 118, 118, 0.767);
  font-size: 18px;
  text-decoration: none; 
  border: solid 1px rgba(119, 118, 118, 0.767);
  border-radius: 25px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  min-width:140px;
  z-index: 1;
  cursor: pointer;
  transition:0.13s ease-in;
  

 }
 a {
  text-decoration: none;
  color:  #3D405B;
}

.nav-item:hover{
    background:rgba(107, 106, 168, 0.247);
}
.nav-item:active{
    background:rgba(107, 106, 168, 0.247);
}

</style>

<template lang="html">
    <div class="tabs">
      <ul class='tabs__header'>
        <li v-for='(tab, index) in tabs'
          :key='tab.title'
          @click='selectTab(index)'
          :class='{"tab__selected": (index == selectedIndex)}'>
          {{ tab.title }}
        </li>
      </ul>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        selectedIndex: 0, // the index of the selected tab,
        tabs: []         // all of the tabs
      }
    },
    created () {
      this.tabs = this.$children
    },
    mounted () {
      this.selectTab(0)
    },
    methods: {
      selectTab (i) {
        this.selectedIndex = i
        // loop over all the tabs
        this.tabs.forEach((tab, index) => {
          tab.isActive = (index === i)
        })
      }
    }
  }
  </script>
  
  <style lang="css">
    ul.tabs__header {
      display: block;
      list-style: none;
      margin: 0 0 0 20px;
      padding: 0;
    }
    ul.tabs__header > li {
      padding: 15px 30px;
      border-radius: 10px;
      margin: 0;
      display: inline-block;
      margin-right: 5px;
      cursor: pointer;
    }
    ul.tabs__header > li.tab__selected {
      font-weight: bold;
      border-radius: 10px 10px 0 0;
      border-bottom: 8px solid transparent;
    }
    .tab {
      display: inline-block;
      color: black;
      padding: 20px;
      min-width: 800px;
      border-radius: 10px;
      min-height: 400px;
    }
    .tabs .tab{
    background-color: #fff;
  }
  .tabs li {
    background-color: #ddd;
    color: #aaa;
  }
  .tabs li.tab__selected {
    background-color: #fff;
    color: #83FFB3;
  }
  </style>
<template>
    <div>
      <router-link to="/addItem">Add new Item</router-link>
    <table-template 
      caption="Kõik auhinnad" 
      :items="items" 
      :showControls="true" 
      @show="itemDetailId = $event.id">
    </table-template>
    </div>
  <item-details 
    :itemDetailId = "itemDetailId"
    @close="itemDetailId = 0">
  </item-details> 
  </template>
  
  <script>
  import TableTemplate from '../components/Table.vue';
  import ItemDetails from '../components/ItemDetails.vue';
  import { RouterLink } from 'vue-router';
  
  export default {
    components: {
      ItemDetails,
      TableTemplate,
      RouterLink,
    }, 
    data() {
      return {
        items: [],
        itemDetailId: 0,    
      };
    },
    async created() {
      this.items = await (await fetch("http://localhost:8090/items")).json()
    },  
  }
  </script>
  
  <style scoped>
  header {
    line-height: 1.5;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
  
    .logo {
      margin: 0 2rem 0 0;
    }
  
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
  </style>
  
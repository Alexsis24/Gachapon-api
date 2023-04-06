<template>
    <div>
      <router-link to="/addGacha">Add new Gachapon Machine</router-link>
    <table-template 
      caption="Kõik Gacha Masinad" 
      :items="gachas" 
      :showControls="true" 
      @show="gachaDetailId = $event.id">
    </table-template>
    </div>
  <gacha-details 
    :gachaDetailId = "gachaDetailId"
    @close="gachaDetailId = 0">
  </gacha-details> 
  </template>
  
  <script>
  import TableTemplate from '../components/Table.vue';
  import GachaDetails from '../components/GachaDetails.vue';
  import { RouterLink } from 'vue-router';
  
  export default {
    components: {
      GachaDetails,
      TableTemplate,
      RouterLink,
    }, 
    data() {
      return {
        gachas: [],
        gachaDetailId: 0,    
      };
    },
    async created() {
      this.gachas = await (await fetch("http://localhost:8090/gachas")).json()
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
  
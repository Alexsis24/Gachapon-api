<template>           
    <div>
      <router-link to="/createItem">Add new Item</router-link>
    <table-item-template 
      caption="Rewards"
      :items="gacha.Items" 
      :showControls="false" >
    </table-item-template>
    </div>
  </template>
  
  <script>
  import TableItemTemplate from '../components/TableItems.vue';
/*   import Items from '../components/ItemDetails.vue' */
  import { RouterLink } from 'vue-router';
  
  export default {
    components: {
/*       ItemDetails: Items, */
      TableItemTemplate: TableItemTemplate,
      RouterLink,
    },
    data() {
      return {
        gacha: {
          Items:[{
            id: 0,
            ItemName: "",
            ItemImageLink: "",
          }]
        },  
      };
    },
    async created() {
      console.log("created", this.$route.params)
      this.gacha = await (await fetch(`http://localhost:8090/gachas/${this.$route.params.gachaId}`)).json()
      this.gacha.Items = this.gacha.Items.map(function(item) {delete item.Reward; return item})

      console.log("gacha", this.gacha)

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
  
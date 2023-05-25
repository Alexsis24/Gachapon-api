<template>           
    <div>
      <router-link to="/createItem">Add new Item</router-link>
    <table-item-template 
      caption="Rewards"
      :items="gacha.Items" 
      :showControls="true" 
      @show="itemDetailId = $event.id">
    </table-item-template>
    </div>
    <item-details 
    :itemDetailId = "itemDetailId"
    @close="itemDetailId = 0">
  </item-details> 
  <modal :show="JSON.stringify(itemToDelete) !== '{}'">
    <template #header>
      <h3>Item deletion</h3>
    </template>
    <template #body>
      <p>*John Cena* "ARE YOU SURE ABOUT THAT?!??!"</p>
    </template>
    <template #footer>
      <button class="modal-default-button" @click="deleteItem()">Yes</button>
      <button class="modal-default-button" @click="itemToDelete={}">No</button>
    </template>
  </modal>
  </template>

  <script>
  import TableItemTemplate from '../components/TableAllItems.vue';
  import Items from '../components/ItemDetails.vue'
  import { RouterLink } from 'vue-router';
  
  export default {
    components: {
      ItemDetails: Items,
      TableItemTemplate: TableItemTemplate,
      RouterLink,
    },
    data() {
      return {
        itemDetailId: 0,
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
  
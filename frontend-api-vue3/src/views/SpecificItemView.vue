<template>
    <div>
    <table-template 
      caption="This item"
      :items="items" 
      :showControls="false">
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
  import Modal from '../components/Modal.vue';
  
  export default {
    components: {
      ItemDetails,
      TableTemplate,
      RouterLink,
      Modal,
    }, 
    data() {
      return {
        items: [],
        itemDetailId: 0,    
        itemToDelete: {},
      };
    },
    async created() {
      this.items = await (await fetch("http://localhost:8090/items")).json()
    },
    
  methods: {
    async deleteItem() {
      fetch("http://localhost:8090/items/" + this.itemToDelete.id, {
        method: "delete",
      }).then(async (response) => {
        if (response.status == 204) {
          this.items.splice(this.games.indexOf(this.itemToDelete), 1);
          this.itemToDelete = {};
        } else {
          const data = await response.json();
          console.log("DELETE: ", data);
        }
      });
    },
    navigateToItems(itemDetailId) {
      this.$router.push({name: "viewSingleItem", params: {itemId: itemDetailId}});
      
    },
  },
  };

  </script>
  
  <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
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

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
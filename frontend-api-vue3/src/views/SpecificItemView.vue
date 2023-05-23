<template>
    <div>
    <router-link to="/addItem">Add new Item</router-link>
    <table-template 
      caption="All items"
      :items="items" 
      :showControls="true" 
      @show="itemDetailId = $event.id"
      @delete="itemToDelete = $event">
    </table-template>
    </div>
  <item-details 
    :itemDetailId = "itemDetailId"
    @close="itemDetailId = 0">
  </item-details>
  <modal :show="JSON.stringify(itemToDelete) !== '{}'">
  <template #header>
  <h3>Delete item</h3>
  </template>
  <template #body>
      <p>Are you sure you want to delete?</p>
    </template>
    <template #footer>
      <button class="modal-default-button" @click="deleteItem()">yes</button>
      <button class="modal-default-button" @click="itemToDelete = {}">No</button>
    </template>
  </modal>
  </template>
  
  <script>
  import TableTemplate from '../components/TableMachine.vue';
  import ItemDetails from '../components/ItemDetails.vue';
  import Modal from '../components/Modal.vue';
  import { RouterLink } from 'vue-router';
  
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
<template>
    <div>
      <table border="1">
        <caption>
          Kõik esemed
        </caption>
        <tr>
          <th>Eseme nimed</th>
          <th></th>
        </tr>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.ItemName }}</td>
          <td><button @click=" itemDetailId = item.id">Kuva Detailid</button></td>
        </tr>
      </table>
    </div>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="showModal" @close="showModal = false">
        <template #header>
          <h3>Eseme detailid</h3>
        </template>
        <template #body>
          <b>Nimi: </b>{{ currentItem.ItemName }}<br>
          <b>Info: </b>{{ currentItem.ItemDescription }}<br>
          <b>Pilt: </b>{{ currentItem.ItemImageLink }}<br>
          <b>Kogus: </b>{{ currentItem.ItemSupply }}<br>
        </template>
      </modal>
    </Teleport>
  </template>
  
  <script>
  import Modal from './components/Modal.vue'
  
  export default {
    components: {
      Modal
    }, 
    data() {
      return {
        items: [],
      showModal : false,
      itemDetailId : 0,
      currentItem: {id: 0, ItemName: "", ItemDescription: "", ItemImageLink: "", ItemSupply: 0}
      };
    },
    async created() {this.items = await (await fetch("http://localhost:8090/items")).json();},
    watch: {
      async itemDetailId(newId) {
        this.currentItem = await (await fetch(`http://localhost:8090/items/${newId}`)).json();
        this.showModal = true;
      },
    },
  };
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
  
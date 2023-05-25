<template>
    <div>
      <router-link to="/addGacha">Add new Gachapon Machine</router-link>
    <table-template 
      caption="Kõik Gacha Masinad" 
      :items="gachas" 
      :showControls="true" 
      @show="gachaDetailId = $event.id"
      @delete="gachaToDelete = $event"
      @rewards="navigateToRewards ($event.id)">
    </table-template>
    </div>
  <gacha-details 
    :gachaDetailId = "gachaDetailId"
    @close="gachaDetailId = 0">
  </gacha-details> 
  <modal :show="JSON.stringify(gachaToDelete) !== '{}'">
    <template #header>
      <h3>Gachapon deletion</h3>
    </template>
    <template #body>
      <p>*John Cena* "ARE YOU SURE ABOUT THAT?!??!"</p>
    </template>
    <template #footer>
      <button class="modal-default-button" @click="deleteGacha()">Yes</button>
      <button class="modal-default-button" @click="gachaToDelete={}">No</button>
    </template>
  </modal>
  </template>
  
  <script>
  import TableTemplate from '../components/Table.vue';
  import GachaDetails from '../components/GachaDetails.vue';
  import Rewards from '../components/RewardDetails.vue';
  import { RouterLink } from 'vue-router';
  //import modal. why isnt it here?
  import Modal from '../components/Modal.vue';
  
  export default {
    components: {
      GachaDetails,
      TableTemplate,
      Rewards,
      RouterLink,
      Modal,
    }, 
    data() {
      return {
        gachas: [],
        gachaDetailId: 0, 
        gachaToDelete: {}
      };
    },
    async created() {
      this.gachas = await (await fetch("http://localhost:8090/gachas")).json()
    },  
    methods: {
      async deleteGacha() {
        fetch("http://localhost:8090/gachas/" + this.gachaToDelete.id, {method: "delete", })
        .then(async(response) =>{
          if (response.status == 204) {
            this.gachas.splice(this.gachas.indexOf(this.gachaToDelete), 1);
            this.gachaToDelete = {};
          } else {
            const data = await response.json();
            console.log("delete: ",data);}
        });
      },
      navigateToRewards(gachaDetailId) {
        this.$router.push({name: "viewGacha", params: {gachaId: gachaDetailId}})
        
      },

    }
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
<template>
  <div>
  <table-template 
    caption="Kõik Gacha Masinad" 
    :items="gachas" 
    :showControls="true" 
    @show="gachaDetailId = $event.id">
  </table-template>
  </div>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="gachaDetailId != 0" @close="gachaDetailId = 0">
      <template #header>
        <h3>Gachapon machine details</h3>
      </template>
      <template #body>
        <b>Nimi: </b>{{ currentGachaMachine.name }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item1Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item2Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item3Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item4Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item5Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item6Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item7Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item8Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item9Rarity }}<br>
        <b>Harulduse number: </b>{{ currentGachaMachine.item10Rarity }}<br>
        <b>Kogus: </b>{{ currentGachaMachine.gachaAmount }}<br>
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from './components/Modal.vue';
import TableTemplate from './components/Table.vue';

export default {
  components: {
    Modal,
    TableTemplate,
  }, 
  data() {
    return {
      gachas: [
        /* 
        {id:1,name:"testgachamachineforvue"},
    {id:2,name:"anothertestmachineforvue"}] */],
    showModal : false,
    currentGachaMachine: {id: 0, name: "", item1Rarity: 0, item2Rarity: 0, item3Rarity: 0, item4Rarity: 0, item5Rarity: 0, item6Rarity: 0, item7Rarity: 0, item8Rarity: 0, item9Rarity: 0, item10Rarity: 0, gachaAmount: 0}
    };
  },
  async created() {this.gachas = await (await fetch("http://localhost:8090/gachas")).json()},
  watch: { async gameDetailId(newId) {
    if (newIs == 0) return;
    this.currentGame = await (
      await fetch(`http://localhost:8090/gachas/${newId}`)).json();
    }
  }
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

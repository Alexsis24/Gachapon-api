<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="gachaDetailId != 0" @close="$emit('close')">
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
import Modal from './Modal.vue';
  export default {
    components:{
      Modal,
    },
    props: {
      gachaDetailId: {
        type : Number,
        required : true,
      }
    },
    emits:["close"],
    data() {
      return{
        currentGachaMachine: {
          id: 0,
          name: "",
          item1Rarity: 0,
          item2Rarity: 0,
          item3Rarity: 0,
          item4Rarity: 0,
          item5Rarity: 0,
          item6Rarity: 0,
          item7Rarity: 0,
          item8Rarity: 0,
          item9Rarity: 0,
          item10Rarity: 0,
          gachaAmount: 0
        },
      };
    },
    beforeUpdate() {
      //console.log(this.gachaDetailId);
      if (this.gachaDetailId==0) return;
      this.getDetails()
    },
    methods: {
      async getDetails() {
        this.currentGachaMachine = await (
          await fetch(`http://localhost:8090/gachas/${this.gachaDetailId}`)
        ).json();
      },
    },
  };
</script>
<style>
  .modal-container{
    width: 500px;
  }
</style>
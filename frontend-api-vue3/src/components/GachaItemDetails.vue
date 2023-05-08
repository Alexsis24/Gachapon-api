<template>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="gachaDetailId != 0" @close="$emit('close')">
        <template #header>
          <h3>Selected item details</h3>
        </template>
        <template #body>
          <b>Nimi: </b>{{ currentGachaMachineItem.ItemName }}<br>
          <b>Kirjeldus: </b>{{ currentGachaMachineItem.ItemDescription }}<br>
          <b>Pilt: </b>{{ currentGachaMachineItem.ItemImagelink }}<br>
          <b>Supply: </b>{{ currentGachaMachineItem.ItemSupply }}<br>
          <b>Haruldus: </b>{{ currentGachaMachineItem.ItemDescription }}<br>
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
          currentGachaMachineItem: {
            id: 0,
            ItemName: "",
            ItemSupply: 0,
            ItemDescription: "",
            ItemImagelink: "",
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
<template>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="itemDetailId != 0" @close="$emit('close')">
        <template #header>
          <h3>Selected item details</h3>
        </template>
        <template #body>
          <b>Nimi: </b>{{ currentItem.ItemName }}<br>
          <b>Kirjeldus: </b>{{ currentItem.ItemDescription }}<br>
          <b>Pilt: </b>{{ currentItem.ItemImagelink }}<br>
          <b>Supply: </b>{{ currentItem.ItemSupply }}<br>
          <b>Haruldus: </b>{{ currentItem.ItemDescription }}<br>
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
        itemDetailId: {
          type : Number,
          required : true,
        }
      },
      emits:["close"],
      data() {
        return{
          currentItem: {
            id: 0,
            ItemName: "",
            ItemSupply: 0,
            ItemDescription: "",
            ItemImagelink: "",
          },
        };
      },
      beforeUpdate() {
        //console.log(this.itemDetailId);
        if (this.itemDetailId==0) return;
        this.getDetails()
      },
      methods: {
        async getDetails() {
          this.currentItem = await (
            await fetch(`http://localhost:8090/items/${this.itemDetailId}`)
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
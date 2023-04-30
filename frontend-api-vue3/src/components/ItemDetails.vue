<template>
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <modal :show="itemDetailId != 0" @close="$emit('close')">
        <template #header>
          <h3>Item details</h3>
        </template>
        <template #body>
          <b>Name: </b>{{ currentItem.ItemName }}<br>
          <b>Description: </b>{{ currentItem.ItemDescription }}<br>
          <b>Picture: </b>{{ currentItem.ItemImageLink }}<br>
          <b>Supply: </b>{{ currentItem.ItemSupply }}<br>
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
            ItemDescription: "",
            ItemImageLink: "",
            ItemSupply: 0,
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
<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="gachaDetailId != 0" @close="$emit('close')">
      <template #header>
        <h3>Gachapon machine details</h3>
      </template>
      <template #body>
        <b>Nimi: </b>{{ currentGachaMachine.name }}<br>
        <b>Kogus: </b>{{ currentGachaMachine.gachaAmount }}<br>
        <b>Kirjeldus: </b>{{ currentGachaMachine.description }}<br>
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
          gachaAmount: 0,
          description: "",
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
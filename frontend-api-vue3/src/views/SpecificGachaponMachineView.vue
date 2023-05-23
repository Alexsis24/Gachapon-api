<template>
    <div>
    <table-template 
      caption=""
      :items="rewards" 
      :showControls="true" 
      @show="rewardDetailId = $event.id">
    </table-template>
    </div>
  <reward-details 
    :rewardDetailId = "rewardDetailId"
    @close="rewardDetailId = 0">
  </reward-details> 
  </template>
  
  <script>
  import TableMachineTemplate from '../components/TableMachine.vue';
  import RewardItemDetails from "../components/RewardDetails.vue" //'../components/SpecificItemView.vue';
  import { RouterLink } from 'vue-router';
  
  export default {
    components: {
      RewardDetails: RewardItemDetails,
      TableTemplate: TableMachineTemplate,
      RouterLink,
    },
      props: {
        rewardDetailId: {
          type : Number,
          required : true,
        }
      }, 
    data() {
      return {
        rewards: [],
        rewardDetailId: 0,    
      };
    },
    async created() {
      this.gachas = await (await fetch("http://localhost:8090/rewards")).json()
    },  
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
  
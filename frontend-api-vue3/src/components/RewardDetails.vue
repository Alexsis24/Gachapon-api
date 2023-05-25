
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
        },
      },
      emits:["close"],
      data() {
        return{
          currentGachaMachine: {
            id: 0,            
              Items: [{
                id:0,
                ItemName: "",
                ItemImagelink: "",
              }]
            }
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
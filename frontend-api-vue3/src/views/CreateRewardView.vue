<template>
    <div class="container">
      <div v-if="error">
        <span v-for="(message, index) in error" :key="index">
          {{ message }} <br />
        </span>
      </div>
      <form @submit.prevent="formSubmitHandler">
        <div class="row">
          <div class="col-25">
            <label for="gacha">Gachapon</label>
          </div>
          <div class="col-75">
            <select id="gacha" v-model="gachaId" required>
              <option v-for="item in gachas" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="item">Item</label>
          </div>
          <div class="col-75">
            <select id="item" v-model="itemId" required>
              <option v-for="item in items" :key="item.id" :value="item.id">
                {{ item.ItemName }}
              </option>
            </select>
          </div>
        </div>
        <br />
        <div class="row">
          <input type="submit" value="Add Item" />
        </div>
      </form>
    </div>
  </template>
  <script>
  const API_URL = "http://localhost:8090/rewards";
  export default {
    data() {
      return {
        error: "",
        gachas: [],
        gachaId: 0,
        items: [],
        itemId: 0,
      };
    },
    async created() {
      this.gachas = await (await fetch("http://localhost:8090/gachas")).json();
      this.items = await (await fetch("http://localhost:8090/items")).json();
    },
    methods: {
      formSubmitHandler() {
        const newReward = {
          gachaId: this.gachaId,
          itemId: this.itemId,
        };
        fetch(API_URL, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReward),
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              this.$router.push("/gachas");
              return;
            }
            this.error = data.error;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  };
  </script>
  <style>
  * {
    box-sizing: border-box;
  }
  
  input[type="text"],
  input[type="date"],
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }
  
  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }
  
  input[type="submit"] {
    background-color: #04aa6d;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }
  
  input[type="submit"]:hover {
    background-color: #45a049;
  }
  
  .container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  }
  
  .col-25 {
    float: left;
    width: 25%;
    margin-top: 6px;
  }
  
  .col-75 {
    float: left;
    width: 75%;
    margin-top: 6px;
  }
  
  /* Clear floats after the columns */
  .row::after {
    content: "";
    display: table;
    clear: both;
  }
  
  /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .col-25,
    .col-75,
    input[type="submit"] {
      width: 100%;
      margin-top: 0;
    }
  }
  </style>
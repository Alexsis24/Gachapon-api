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
            <label for="ItemName">Name</label>
          </div>
          <div class="col-75">
            <input id="ItemName" type="text" v-model="ItemName" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="ItemDescription">Description</label>
          </div>
          <div class="col-75">
            <textarea id="ItemDescription" v-model="ItemDescription" required></textarea>
          </div>
        </div>        
        <div class="row">
          <div class="col-25">
            <label for="ItemImageLink">Link to image</label>
          </div>
          <div class="col-75">
            <input id="ItemImageLink" type="text" v-model="ItemImageLink" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="ItemSupply">Supply of this item</label>
          </div>
          <div class="col-75">
            <input id="ItemSupply" type="integer" v-model="ItemSupply" required />
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="ItemRarity">Rarity</label>
          </div>
          <div class="col-75">
            <input id="ItemRarity" v-model="ItemRarity" type="integer" required />
          </div>
        </div>
        <br />
        <div class="row">
          <input type="submit" value="Add new item" />
        </div>
      </form>
    </div>
  </template>
  <script>
  const API_URL = "http://localhost:8090/items";
  export default {
    data() {
      return {
        error: "",
        ItemName: "Test",
        ItemImageLink: "put link here",
        ItemDescription: "test description",
        ItemSupply: 100,
        ItemRarity: 2,
      };
    },
    methods: {
      formSubmitHandler() {
        const newItem = {
          ItemName: this.ItemName,
          ItemDescription: this.ItemDescription,
          ItemImageLink: this.ItemImageLink,
          ItemSupply: this.ItemSupply,
          ItemRarity: this.ItemRarity,
        };
        fetch(API_URL, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) {
              this.$router.push("/allItems");
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
    color: #45a049;
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
    background-color: #04AA6D;
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
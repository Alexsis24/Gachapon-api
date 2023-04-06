<template>
    <div class="container">
        <div v-if="error"> <span v-for="(message, index) in error" :key="index">{{ message }} <br/> </span> </div>
        <form @submit.prevent="formSubmitHandler">
            <div class="row">
                <div class="col-25">
            <label for="name">Name</label></div>
                <div class="col-75">
            <input id="name" type="text" v-model="name" required></div>
            </div>
            <div class="row">
                <div class="col-25">
            <label for="item1Rarity">Item 1 Rarity</label></div>
                <div class="col-75">
            <input id="item1Rarity" type="text" v-model="item1Rarity" required> </div>
            </div>    
            <div class="row">
                <div class="col-25">
            <label for="item2Rarity">Item 2 Rarity</label></div>
                <div class="col-75">
            <input id="item2Rarity" type="text" v-model="item2Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item3Rarity">Item 3 Rarity</label></div>
                <div class="col-75">
            <input id="item3Rarity" type="text" v-model="item3Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item4Rarity">Item 4 Rarity</label></div>
                <div class="col-75">
            <input id="item4Rarity" type="text" v-model="item4Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item5Rarity">Item 5 Rarity</label></div>
                <div class="col-75">
            <input id="item5Rarity" type="text" v-model="item5Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item6Rarity">Item 6 Rarity</label></div>
                <div class="col-75">
            <input id="item6Rarity" type="text" v-model="item6Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item7Rarity">Item 7 Rarity</label></div>
                <div class="col-75">
            <input id="item7Rarity" type="text" v-model="item7Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item8Rarity">Item 8 Rarity</label></div>
                <div class="col-75">
            <input id="item8Rarity" type="text" v-model="item8Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item9Rarity">Item 9 Rarity</label></div>
                <div class="col-75">
            <input id="item9Rarity" type="text" v-model="item9Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="item10Rarity">Item 10 Rarity</label></div>
                <div class="col-75">
            <input id="item10Rarity" type="text" v-model="item10Rarity" required> </div>
            </div>   
            <div class="row">
                <div class="col-25">
            <label for="gachaAmount">Amount of pulls in the machine</label></div>
                <div class="col-75">
            <input id="gachaAmount" type="text" v-model="gachaAmount" required> </div>
            </div>  
            <div class="row">
            <input type="submit" value="Add Gacha Machine">
            </div>  
        </form>
    </div>
</template>
<script>
const API_URL = 'http://localhost:8090/gachas';
export default {
    data() {
        return {
            error: '',
            name: 'frontend add machine test',
            item1Rarity: '1',
            item2Rarity: '2',
            item3Rarity: '3',
            item4Rarity: '4',
            item5Rarity: '5',
            item6Rarity: '6',
            item7Rarity: '7',
            item8Rarity: '8',
            item9Rarity: '9',
            item10Rarity: '10',
            gachaAmount: '100'
        }
    },
    methods: {
        formSubmitHandler() {
            const newGachaMachine = {
                name: this.name,
                item1Rarity: this.item1Rarity,
                item2Rarity: this.item2Rarity,
                item3Rarity: this.item3Rarity,
                item4Rarity: this.item4Rarity,
                item5Rarity: this.item5Rarity,
                item6Rarity: this.item6Rarity,
                item7Rarity: this.item7Rarity,
                item8Rarity: this.item8Rarity,
                item9Rarity: this.item9Rarity,
                item10Rarity: this.item10Rarity,
                gachaAmount: this.gachaAmount
            }
            fetch(API_URL, {method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(newGachaMachine)
            })
            .then(this.checkResponseStatus)
            .then(response => response.json())
            .then(data => {
                if(data.error) {this.$router.push('/');
                return;
                    }
                    this.error = data.error;
                }
            )
            .catch(error => {console.log(error)});
        }
    }
}

</script>
<style>
* {
  box-sizing: border-box;
}

input[type=text], select, textarea {
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

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type=submit]:hover {
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
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
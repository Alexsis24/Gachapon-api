<template>
    <div class="container">
        <div v-if="error"> <span v-for="(message, index) in error" :key="index">{{ message }} <br/> </span> </div>
        <form @submit.prevent="formSubmitHandler">

            <div class="row">
                <div class="col-50">
                    <label for="name">Name</label>
                </div>
                <div class="col-75">
                <input id="name" type="text" v-model="name" required>
                </div>
            </div>

            <div class="row">
                <div class="col-50">
                <label for="gachaAmount">Amount of pulls in the machine</label>
                </div>
                <div class="col-75">
                    <input id="gachaAmount" type="text" v-model="gachaAmount" required> 
                </div>
            </div>  

            <div class="row">
                <div class="col-50">
                    <label for="name">Description of the Machine</label>
                </div>
                <div class="col-75">
                <input id="name" type="text" v-model="description" required>
                </div>
            </div>

            <div class="row">
                <div class="col-50">
                    <input type="submit" value="Add Gacha Machine">
                </div>
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
            gachaAmount: '100',
            description: 'example machine test description'
        }
    },
    methods: {
        formSubmitHandler() {
            const newGachaMachine = {
                name: this.name,
                gachaAmount: this.gachaAmount,
                description: this.description
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
  color: green;
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
<template>
  
  <div >

      <form v-on:submit.prevent="onSubmit">
          <div class="mb-3">
          <input v-model="adr"> |
          <input type="submit" class="btn btn-primary" >
          </div>
      </form>
   
      
      
  </div>

  <div v-if="seen" class="container">
    <table class="table ">
       
          <tbody>
          <tr v-for="transaction in transactions" v-bind:key="transaction">
              <td>HASH:</td>
              <td>{{transaction.hash}}</td>
              <td><router-link :to="`/transaction/${transaction.hash}`">Details</router-link> </td>
              
          </tr>
          </tbody>
    </table>
  </div>
  
</template>
<script>
import axios from 'axios';
  export default {
    name: 'AddressTransactions',
    data() {
    
      return {
        transactions: {},
        api: this.API_URL,
        seen: false
      }
    },
    
    methods: {
        onSubmit () {
  
      axios
        .get(this.api+'/address/transactions/'+this.adr)
        .then(res => {
          this.transactions = res.data;      
        this.seen=true;

        })
        .catch(error => console.log(error))

       
        
        }
    }
  }
  
  
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
  
</style>
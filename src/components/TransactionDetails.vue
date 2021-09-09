<template>
 

  <div v-if="seen" class="container">
      
      <table class="table" v-for="transaction in transactions" v-bind:key="transaction">
          <tbody>
          
            <tr>
               <td>Hash:</td>
              <td>{{transaction.hash}}</td>
              
          </tr>
            <tr>
               <td>Signed:</td>
              <td>{{transaction.issigned}}</td>
              
          </tr>
          <tr>
              <td>Sender:</td>
              <td>{{transaction.sender}}</td>

            </tr>
          <tr>
              <td>Recipient:</td>
              <td>{{transaction.recipient}}</td>

            </tr>
            <tr>
              <td>Amount:</td>
              <td>{{transaction.amount}}</td>

            </tr>
            <tr>
              <td>Call:</td>
              <td>{{transaction.method}}</td>

            </tr>
          </tbody>
          </table>
  </div>
  
</template>
<script>
import axios from 'axios';
  export default {
    name: 'TransactionDetails',
    data() {
    
      return {
        transactions: {},
        api: this.API_URL,
        seen: false
      }
    },
    
   mounted  () {
  
      axios
        .post(this.api+'/transactions/hash/',{transactionHash: this.$route.params.hash})
        .then(res => {
          this.transactions = res.data;      
        this.seen=true;

        })
        .catch(error => console.log(error))

       
        
        }
    }
  
  
  
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
</style>
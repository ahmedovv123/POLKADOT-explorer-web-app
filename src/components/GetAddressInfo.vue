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
      
       <table class="table">
          <tbody>
          
            <tr>
               <td>Free Balance:</td>
              <td>{{data.data.free}}</td>
              
          </tr>
            <tr>
               <td>Nonce:</td>
              <td>{{data.nonce}}</td>
              
          </tr>
          <tr>
              <td>Reserved Balance:</td>
              <td>{{data.data.reserved}}</td>

            </tr>
            
          </tbody>
          </table>
  </div>
  
</template>
<script>
import axios from 'axios';
  export default {
    name: 'GetAddressInfo',
    data() {
    
      return {
       data:{},
        api: this.API_URL,
        
        seen: false
      }
    },
    
    methods: {
        onSubmit () {
  
      axios
        .get(this.api+'/address/'+ this.adr)
        .then(res => {
          this.data = res.data;    this.seen=true;  
        
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
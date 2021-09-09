<template>
  
  <div >

      <form v-on:submit.prevent="onSubmit">
          <div class="mb-3">
          <input v-model="htransaction"> |
          <input type="submit" class="btn btn-primary" >
          </div>
      </form>
   
      
      
  </div>

  <div v-if="seen" class="container">
      {{transaction}}
      
  </div>
  
</template>
<script>
import axios from 'axios';
  export default {
    name: 'BlockByHash',
    data() {
    
      return {
        transaction: {},
        api: this.API_URL,
        seen: false
      }
    },
    
    methods: {
        onSubmit () {
  
      axios
        .post(this.api+'/blocks/hash/',{hash:this.htransaction})
        .then(res => {
          this.transaction = res.data;      
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
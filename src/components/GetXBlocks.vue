<template>
 
  <div class="container">

      <form v-on:submit.prevent="onSubmit" >
          <div class="mb-3">
            Block number:
          <input v-model="blocknum"> |
          Number of blocks:
          <input v-model="x"> |
          <input type="submit" class="btn btn-primary" >
          </div>
      </form>
   
      
  </div>
  
  

  <div v-if="seen" class="container">
      <table class="table ">
          <tbody>
          <tr v-for="block in blocks" v-bind:key="block">
              <td>HASH:</td>
              <td>{{block}}</td>
              <td><router-link :to="`/block/${block}`">Details</router-link> </td>
              
          </tr>
          </tbody>
          </table>
  </div>
  
</template>
<script>
import axios from 'axios';
  export default {
    name: 'BlockByNumber',
    data() {
    
      return {
        blocks: {},
        api: this.API_URL,
        seen: false
      }
    },
    
    methods: {
        onSubmit () {
  
      axios
        .get(this.api+'/blocks/'+ this.x+'/'+this.blocknum)
        .then(res => {
          this.blocks = res.data;      
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
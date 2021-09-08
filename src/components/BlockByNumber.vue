<template>
  
  <div >

      <form v-on:submit.prevent="onSubmit">
          <div class="mb-3">
          <input v-model="blocknum"> |
          <input type="submit" class="btn btn-primary" >
          </div>
      </form>
   
   
      
  </div>

  <div v-if="seen" class="container">
       <table class="table">
          <tbody>
          <tr>
              <td>Number:</td>
              <td>{{block.block.header.number}}</td>

            </tr>
            <tr>
               <td>Hash:</td>
              <td>{{hash}}</td>
              
          </tr>
            <tr>
               <td>Parent Hash:</td>
              <td>{{block.block.header.parentHash}}</td>
              
          </tr>
          <tr>
              <td>State Root:</td>
              <td>{{block.block.header.stateRoot}}</td>

            </tr>
            <tr>
              <td>Extrinsics Root:</td>
              <td>{{block.block.header.extrinsicsRoot}}</td>

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
        hash: {},
        api: this.API_URL,
        block:{},
        seen: false
      }
    },
    
    methods: {
        onSubmit () {
  
      axios
        .get(this.api+'/blocks/num/'+ this.blocknum)
        .then(res => {
          this.hash = res.data;      
        axios
        .post(this.api+'/blocks/hash/',{hash:this.hash})
        .then(res2 => {
          this.block = res2.data;      
        this.seen=true;

        })
        .catch(error => console.log(error))
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
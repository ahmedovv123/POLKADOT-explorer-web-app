<template>
 

  <div v-if="seen" class="container">
      
      <table class="table">
          <tbody>
          <tr>
              <td>Number:</td>
              <td>{{block.block.header.number}}</td>


            </tr>
            <tr>
               <td>Hash:</td>
              <td>{{$route.params.hash}}</td>
              
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
    name: 'BlockDetails',
    data() {
    
      return {
        block: {},
        api: this.API_URL,
        seen: false
      }
    },
    
   mounted  () {
  
      axios
        .post(this.api+'/blocks/hash/',{hash: this.$route.params.hash})
        .then(res => {
          this.block = res.data;      
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
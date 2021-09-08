<template>
  
  <div class="container" id ="count">
     Finalized Blocks {{blocks}}
  </div>
  
</template>
<script>
import axios from 'axios';

  export default {
    name: 'BlocksCount',
    
    data() {
       
       
      return {
        blocks: {},
        api: this.API_URL
       
      }
     
    },
    
    mounted () {
      
        //let url = this.API_URL+'/blocks';
        
      axios
        .get(this.api+'/blocks')
        .then(res => {
          this.blocks = res.data.block.header.number;
        })
        .catch(error => console.log(error))
        
   
    }
  }
  
  
</script>
<style>
  h3 {
    margin-bottom: 5%;
  }
  #count {
    margin: 50px ;
    background-color: blueviolet;
    width: 40%;
    height: 80px;
    color: white;
    border-radius: 5px;
  }
</style>
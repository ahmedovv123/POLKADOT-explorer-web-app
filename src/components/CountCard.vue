<template>
     
   <router-link :to='`/${route}`'>

        <div class="card">

           
            <CountCardSpinner v-show='isLoading' />
          
            
            <div class="card-header">{{title}} </div>
            <div class="card-body">  {{count}}  </div>
            
        </div>
    </router-link>

</template>

<script>
import CountCardSpinner from './CountCardSpinner.vue'
    export default {    
        name: 'CountCard',
         props: {
            title: String,
            count: Number,
            route: String,
            isLoading: Boolean
        },
        components: {
            CountCardSpinner
        },
        
       
    }
    
    
</script>

<style scoped>
.card {
    border: 2px solid grey;
    border-radius: 10px;
    width: 200px;
    height: 150px;
    transition: all 0.3s ease-in-out;
    position: relative;
}

.card:hover {
    border: 2px solid blue;
    cursor: pointer;
    color: blue;
    margin-top: -10px;
}

.card-header{
    display: flex;
    justify-content: center;
    padding: 15px 0;
    border-bottom: 1px solid grey;
    text-decoration: bold;
   
}

.card-body {
    display: flex;
    justify-content: center;
    padding: 15%;
    text-align: center;
    font-size: 25px;
    color: green
}

</style>
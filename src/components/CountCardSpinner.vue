<template>
    
    <div class="back" >

         <div class="loader-box" >
        <semipolar-spinner
        :animation-duration="2000"
        :size="65"
        color="blue"
        />
    </div>
    </div>
    
   
   
   
</template>

<script>
import {SemipolarSpinner} from 'epic-spinners'
    export default {
        name: 'TheSpinner',
        components: {
            SemipolarSpinner
        }
    }
</script>

<style scoped>
.back{
   width: 200px;
    height: 150px;
   background-color:rgba(0,0,0,.1) ;
   display: flex;
   justify-content: center;
    position: absolute;
    top: 0;
   
}

.loader-box {
  
    box-shadow: 0px 0px 9px -2px #f000;
    z-index: 999;
    position: absolute;
    text-align: center;
    top: 50px;
}
</style>
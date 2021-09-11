<template>
    
    <div class="back" ></div>
    
   
    <div class="loader-box" >
        <semipolar-spinner
        :animation-duration="2000"
        :size="65"
        color="blue"
        />
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
   height: 1175px;
   width:100%;
   background-color:rgba(0,0,0,0.4);
   position:absolute;
   top:0;

   z-index: 999;
}

.loader-box {
    position: fixed;
    top: 40%;
    width: fit-content;
    margin: auto;
    
    box-shadow: 0px 0px 9px -2px #f000;
    z-index: 999;
    left: 0px;
    right: 0px;
    text-align: center;
}
</style>
<template>
    <div class="container">
        
        <slot></slot>
        
    </div>
</template>

<script>
import TheSpinner from './TheSpinner.vue'
    export default {
        name: 'TheContainer',
        components: {
            TheSpinner
        }
    }
</script>

<style scoped>
    .container {
        margin-left: auto;
        margin-right: auto;
        width: 70%; 
        height: 1000px
        
    }
</style>
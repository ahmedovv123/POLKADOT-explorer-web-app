<template>
    <div>
        <h2>Details for block - {{blockNumber}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Block',
        data (){
           return {
               blockNumber: this.$route.params.num
           } 
        }
    }
</script>

<style scoped>

</style>
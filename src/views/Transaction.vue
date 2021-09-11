<template>
    <div>
        <h2>Details for transaction - {{txHash}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Transaction',
        data(){
            return{
                txHash: this.$route.params.txhash
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div class="block" >
        <div class="block-header">
            <i class="fas fa-cube"></i>
            <h2>Block #{{blockNumber}}</h2>

        </div>
        <div class="block-body">
            <div class="left">
                <h3>Timestamp</h3>
                <h3>Hash</h3>
                <h3>Parent hash</h3>
                <h3>State Root</h3>
                <h3>Extrinsic Root</h3>
                <h3>Transactions</h3>
            </div>
            <div class="right">
                <h3>{{blockDate(block.extrinsics[0].method.args[0])}}</h3>
                <h3>Hash</h3>
                <h3>{{block.header.parentHash}}</h3>
                <h3>{{block.header.stateRoot}}</h3>
                <h3>{{block.header.extrinsicsRoot}}</h3>
                <h3>{{getTransactionsLength(block.extrinsics)}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import blocksApi from '../gateways/blockApis/blocksApi'

    export default {
        name: 'Block',
        methods: {
            blockDate(timestamp){
                let seconds = parseFloat(timestamp.replace(/,/g,''))
                
                let blockDate = new Date(seconds).toLocaleString('bg-BG')
                
                return blockDate
            },
            getTransactionsLength(extrinsics){
                return extrinsics.filter(ex => ex.method.method == 'transfer' || ex.method.method == 'transfer_keep_alive' ).length
            }
        },
        data (){
           return {
               blockNumber: this.$route.params.num,
               block: {}
           } 
        },beforeCreate(){
            this.$store.dispatch('toggleOnLoading')

        },
        created(){

            blocksApi.get(`/num/${this.blockNumber}`)
            .then(response => {
               blocksApi.post('/hash', {'hash':response.data})
               .then(response => {
                   this.block = response.data.block
                   console.log(this.block);
                   this.$store.dispatch('toggleOffLoading')
               })

                
            })
            .catch(err => console.log(err))
        }
    }
</script>

<style scoped>
.block{
    width:100%;
    height:max-content;
    border: 2px solid blue;
    border-radius: 10px;
    margin-bottom: 50px;
}

i{
    font-size: 30px;
    padding: 20px 20px
}

.block .block-header{
    padding: 5px 20px;
    border-bottom: 1px solid;
    color: blue;
    display: flex;
}

.block .left {
    padding: 0 20px;
    margin-right: 50px;
    color: blue
}



.block-body {
    display: flex;
    
}
</style>
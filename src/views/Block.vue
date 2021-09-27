<template>

<div>
    
    <div class="block" >
        <div class="block-header">
            <i class="fas fa-cube"></i>
            <h2>Block #{{blockNumber}}</h2>

        </div>
        <div class="block-body">
            <div class="left">
                <h3 id=time>Timestamp</h3>
                <h3>Hash</h3>
                <h3>Parent hash</h3>
                <h3>State Root</h3>
                <h3>Extrinsics Root</h3>
                <h3>Transactions</h3>
            </div>
            <div class="right">
                <h3>{{blockDate(block.extrinsics[0].method.args[0])}}</h3>
                <h3>{{blockHash}}</h3>
                <h3>{{block.header.parentHash}}</h3>
                <h3>{{block.header.stateRoot}}</h3>
                <h3>{{block.header.extrinsicsRoot}}</h3>
                <h3>{{getTransactionsLength(block.extrinsics)}}</h3>
            </div>
        </div>
    </div>

    <div class="transactions">
        <div class="block" >
        <div class="block-header">
            <i class="fas fa-file-signature"></i>
            <h2>Transactions</h2>

        </div>
         <div class="table">
            
        <table>
             <colgroup>
        <col width="33%" />
        <col width="33%" />
        <col width="33%" />

        </colgroup>
            <tr class="header">
                <th>From </th>
                <th class="tx-to-header">To  </th>
                <th>Amount </th>
            </tr>
            <div v-if='txs.length == 0' >
                <tr>
                    <td>No Transactions in this block</td>
                </tr>
            </div>
            <tr v-for="tx in txs" :key='tx'> 
            <td class="tx-from" @click='goToAccount(tx.signer.Id)' >  {{tx.signer.Id}} </td>
            <td class="tx-to" @click='goToAccount(tx.method.args[0].Id)'  > {{tx.method.args[0].Id}}  </td>
            <td> {{tx.method.args[1]}} </td>
            </tr>
            
        
        </table>
    </div>
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
                if(!extrinsics.length == 0)
                return extrinsics.filter(ex => ex.method.method == 'transfer' || ex.method.method == 'transferKeepAlive' ).length
            },
             goToAccount(accountId){
                this.$store.dispatch('toggleOnLoading')
                this.$router.push({path: `/accounts/${accountId}`})
            }
        },
        data (){
           return {
               blockNumber: '',
               blockHash: '',
               block: {},
               txs: []
           } 
        },beforeCreate(){
            this.$store.dispatch('toggleOnLoading')

        },
        created(){
            this.blockNumber = this.$route.params.num
            blocksApi.get(`/num/${this.blockNumber}`)
            .then(response => {
                this.blockHash = response.data
               blocksApi.post('/hash', {'hash':response.data})
               .then(response => {
                   this.block = response.data.block
                   console.log(this.block);
                   this.txs = response.data.block.extrinsics.filter(ex => ex.method.method == 'transfer' 
                   || ex.method.method == 'transferKeepAlive' )
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

.tx-from{
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    white-space: nowrap; 
    text-overflow:ellipsis; 
    overflow: hidden; 
    max-width:1px;
    padding: 10px 10px;
}

.tx-from:hover{
    color: blue;
}

.tx-to-header {
    border-left: 2px solid grey;
    border-right: 2px solid grey;
}

.tx-to:hover{
    color: blue;
}

.tx-to  {
    border-left: 2px solid grey;
    border-right: 2px solid grey;
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    white-space: nowrap; 
    text-overflow:ellipsis; 
    overflow: hidden; 
    max-width:1px;
    padding: 10px 10px;
}

table tr th {
    border-bottom: 2px solid grey;
    padding: 10px;
}

.table a {
    text-decoration: none;
}

h2 {
    text-align: center;
    
    padding: 20px 0;
    margin: 0;
}

table td{
    text-align: center;
    
}
.table{
    display: flex;
    flex-direction:column;
    justify-content: center;
    font-size: 19px;
    
    
}
</style>
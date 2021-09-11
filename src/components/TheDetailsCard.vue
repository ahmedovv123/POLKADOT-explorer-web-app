<template>
<h2 style="color: red" v-if="errorMsg" >Cant get blocks :(</h2>
    <div class="cards">
        
        <router-link to="/blocks">
        <div class="card">
            
            <div class="card-header">Finalized Blocks</div>
            <div class="card-body">  {{finalizedBlocks}} </div>
            
        </div>
        </router-link> 
        <router-link to="/transactions">
       <div class="card">
            <div class="card-header">Transactions</div>
            <div class="card-body"> {{txs}} </div>
        </div>
        </router-link> 
         <router-link to="/accounts">
        <div class="card">
            <div class="card-header">Accounts</div>
            <div class="card-body"> {{accounts}} </div>
        </div>
        </router-link> 

    </div>
</template>

<script>
import blocksApi from '../gateways/blockApis/blocksApi'
import accountsApi from '../gateways/accountApis/accountsApi'
import txApi from '../gateways/transactionApis/transactionsApi'
    export default {

        name: 'TheDetailsCard',
        data(){
            return {
                finalizedBlocks: 0,
                blockTimer: '',

                accounts: 0,
                accountTimer: '',

                txs: 0,
                txTimer: '',
                
                errorMsg: ''
            }
        },
        created(){
            this.fetchBlocksNumber()
            this.blockTimer = setInterval(this.fetchBlocksNumber,2000)

            this.fetchAccountsNumber()
            this.accountTimer = setInterval(this.fetchAccountsNumber,10000)

            this.fetchTxNumber()
            this.txTimer = setInterval(this.fetchTxNumber, 5000)
        },
        methods: {
           fetchBlocksNumber() {
            blocksApi.get()
            .then(response => this.finalizedBlocks = response.data.block.header.number)
            .catch(error => this.errorMsg = error)
           },
           fetchAccountsNumber(){
             accountsApi.get('/count')
             .then(response => this.accounts = response.data[0].count)
             .catch(error => this.errorMsg = error)
           },
           fetchTxNumber(){
              txApi.get('/count')
             .then(response => this.txs = response.data[0].count)
             .catch(error => this.errorMsg = error)
           },
           cancelAutoUpdate() {
               clearInterval(this.blockTimer)
               clearInterval(this.accountTimer)
               clearInterval(this.txTimer)
           }
        },
        beforeDestroy(){
            this.cancelAutoUpdate();
        }
    }
</script>

<style scoped>
.cards{
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
}

.cards a {
    text-decoration: none;
    color: solid grey;
}

.card {
    border: 2px solid grey;
    border-radius: 10px;
    width: 200px;
    height: 150px;
    transition: all 0.3s ease-in-out;
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
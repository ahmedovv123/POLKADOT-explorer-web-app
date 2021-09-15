<template>

    <div class="cards">

        <CountCard title="Finalized Blocks" :isLoading="blocksLoading" :count='finalizedBlocks' route="blocks"  />
        <CountCard title="Transactions" :isLoading="txsLoading" :count='txs' route="transactions"/>
        <CountCard title="Accounts" :isLoading="accountsLoading" :count='accounts' route="accounts"/>
        
    

    </div>
</template>

<script>
import blocksApi from '../gateways/blockApis/blocksApi'
import accountsApi from '../gateways/accountApis/accountsApi'
import txApi from '../gateways/transactionApis/transactionsApi'
import CountCard from './CountCard.vue'
    export default {

        name: 'TheDetailsCard',
        components: {
            CountCard
        },
        data(){
            return {
                finalizedBlocks: 0,
                blockTimer: '',
                blocksLoading: true,

                accounts: 0,
                accountTimer: '',
                accountsLoading: true,


                txs: 0,
                txTimer: '',
                txsLoading: true,

                errorMsg: ''
            }
        },

        beforeCreate(){
           // this.$store.dispatch('toggleOnLoading')
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
            .then(response => {
                this.finalizedBlocks = response.data.block.header.number
                this.blocksLoading = false;
            })
            .catch(error => this.errorMsg = error)
           },
           fetchAccountsNumber(){
             accountsApi.get('/count')
             .then(response => {
                 this.accounts = response.data[0].count
                 this.accountsLoading = false;
             })
             
             .catch(error => this.errorMsg = error)
           },
           fetchTxNumber(){
              txApi.get('/count')
             .then(response => {
                this.txs = response.data[0].count
                this.txsLoading = false
                
             })
             .catch(error => this.errorMsg = error)
             
           },
           cancelAutoUpdate() {
               clearInterval(this.blockTimer)
               clearInterval(this.accountTimer)
               clearInterval(this.txTimer)
           }
        },
        beforeUnmount(){
            this.cancelAutoUpdate();
        },
       
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
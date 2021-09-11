<template>
   <div class="table">
        <router-link to="/transactions"> <h2>Last Transactions</h2> </router-link>
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
            
            <tr v-for="tx in txs" :key='tx'> 
            <td class="tx-from" @click='goToAccount(getTxSender(tx))' > {{ getTxSender(tx)  }}</td>
            <td class="tx-to" @click='goToAccount(getTxRecipient(tx))' >  {{ getTxRecipient(tx) }}</td>
            <td> {{ getTxAmount(tx) }}</td>
            </tr>
            
           
   
        </table>
    </div>
</template>

<script>
    export default {
        name: 'LastTransactionsTable',
        data () {
            return {
                timer: '',
            }
        },
        computed: {
            txs: {
                get(){
                    
                    return this.$store.state.transactions
                    
                },
                set(){

                }
            }
        },
        created () {
            this.fetchTx()
            this.timer = setInterval(this.fetchTx,2000)
        },
        methods: {
            fetchTx(){
                this.$store.dispatch('fetchTx')
                
                if(this.txs.length > 13) 
                this.$store.dispatch('clearTx')
            },
            cancelAutoUpdate(){
                clearInterval(this.timer)
            },
            getTxSender(extrinsic){
                return  extrinsic.signer
            },
            getTxRecipient(extrinsic){
                return extrinsic.method.args[0]
            },
            getTxAmount(extrinsic){
                return extrinsic.method.args[1]
            },
            goToAccount(accountId){
                this.$store.dispatch('toggleOnLoading')
                this.$router.push({path: `/accounts/${accountId}`})
            }
        },
        beforeDestroy(){
            this.cancelAutoUpdate();
        },
        
    }
</script>

<style scoped>
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
    border-bottom: 2px solid grey;
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
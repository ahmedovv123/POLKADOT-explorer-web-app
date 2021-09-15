<template>
    <div class="tx-c" >
        <div class="transactions">
            <div class="transactions-header">
            <h2> <i class="fas fa-file-signature"></i> Transactions</h2>
            </div>
            
            <div class="transactions-body">
                <table>
            <colgroup>
               
                <col width="10%" />
                <col width="30%" />
                <col width="30%" />
                <col width="15%" />
                <col width="10%" />

            </colgroup>

            <tr class="header">
                <th>ID </th>
                <th>From </th>
                <th>To  </th>
                <th>Amount</th>
                <th>Details</th>
               
            </tr>
          
            <tr v-for="tx in accountTxs" :key='tx'>
            <td   >  {{ tx.id }}</td>
            <td  :class="`tx-from ${tx.sender == accountId ? 'highlight' : ''}` " @click='goToAccount(tx.sender)' >  {{ tx.sender  }}</td>
            <td :class="`tx-to ${tx.recipient == accountId ? 'highlight' : ''}` " @click='goToAccount(tx.recipient)'> {{ tx.recipient }}</td>
            
            <td> {{parseInt(tx.amount) / 10000000000 }} DOT</td>
            
            <div class="btn" >
                <BaseButton @click='goToTx(block.header.number)' >Details</BaseButton>
            </div>
            
            </tr>
           
           
                   
        </table>
            </div>
            
       
        </div>
         
       
    </div>
</template>

<script>
import BaseButton from '../components/BaseButton.vue'
import addressesApi from '../gateways/accountApis/addressesApi'
    export default {
        name: 'AccountTransactionsTable',
         components: {
            BaseButton
        },
        methods: {
            goToAccount(id){
                this.$router.push({path: `/accounts/${id.toString()}`})
            },

            goNextPage(){
                let nextPage = parseInt(this.currentPage)+1
                this.$router.push({name:'Account', query:{ txPage: this.txs[9].id } } )
                 
            },
            goPreviousPage(){
                
                
                let previousPage = parseInt(this.currentPage)-1
                this.$router.push({name:'Account', query:{ txPage: previousPage } } )
                 
            },
        },
        data(){
            return {
                currentPage: '',
                txs: [],
                txPerPage: 10,
                txCount: this.accountTxs.length

            }
        },
        props: {
            accountTxs: Object,
            accountId: String,
            txPage: String
        },
        // watch: {
        //     accountTxs(newVal){
        //         if(!this.txPage) this.currentPage = 1

        //         let P = newVal.length - ((this.currentPage - 1) * this.txPerPage)
        //         console.log(this.accountTxs.length)
        //         console.log('P= ' + P)
        //         addressesApi.post(`/transactions/${this.txPerPage}/${P}`, {'accountId': `${this.accountId}`})
        //         .then(response => {
        //             this.txs = response.data
        //             console.log(this.txs)
        //             this.txs.reverse()
        //             this.$store.dispatch('toggleOffLoading')
        //     })
        //     }
        // },
        created () {
          
            this.$store.dispatch('toggleOnLoading')

        },
       
    }
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    font-size: 30px;
   
}

.previous, .next {
    cursor: pointer;
}

.previous, .next, .current-page {
   margin: 0 50px;
}



.page-text {
    width: 100%;
    text-align: center;
    font-size: 25px;
}

.tx-from, .tx-to{
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
     white-space: nowrap; 
    text-overflow:ellipsis; 
    overflow: hidden; 
    max-width:1px;
}

.tx-from:hover{
    color: blue;
}

.tx-to:hover{
    color: blue
}

 .highlight{
    background-color: rgb(0,0,255,0.3)
   
}

.header {
    width: 100%;
    border-bottom: 1px solid
}

table {
     width: 100%;
     margin-bottom:40px;
}

table tr th {
    border-bottom: 2px solid grey;
    padding: 10px;
    
   
}

h2 {
    text-align: center;
    
    padding: 20px 0;
    margin: 0;
}

.btn {
    display:flex;
    justify-content: center;
}

table td{
    text-align: center;
    
}

.table a {
    text-decoration: none;
}
.table{
    display: flex;
    flex-direction:column;
    justify-content: center;
    font-size: 19px;
   

}



.transactions{
    width: 100%;
    height: 100%;
    border: 2px solid blue;
    border-radius: 10px;
    margin-bottom: 20px;
     
}

.transactions-header{
    padding: 0 20px;
    border-bottom: 1px solid;
    color: blue
}

.transactions-body{
    max-height: 500px;
    overflow: auto;
}


</style>
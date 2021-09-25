<template>
    <div class="transactions-c" >
        <div class="transactions">
            <div class="transactions-header">
            <h2> <i class="fas fa-file-signature"></i> Transactions</h2>
            </div>
            <table>

            <colgroup>
               
                <col width="10%" />
               <col width="30%" />
                <col width="30%" />
                <col width="15%" />
                <col width="15%" />

            </colgroup>

            <tr class="header">
                <th>Id </th>
                <th>From </th>
                <th>To  </th>
                <th>Method</th>
                <th>Amount</th>
                <th>Details</th>
               
            </tr>
            <tr v-for="tx in txs" :key='tx.id'>
            <td  > {{ tx.id  }}</td>
            <td class="tx-from" @click="goToAccount(tx.sender)"  > {{ tx.sender  }}</td>
            <td class="tx-to" @click="goToAccount(tx.recipient)"> {{ tx.recipient }}</td>
            <td  > {{ tx.method }}</td>
            <td> {{ parseInt(tx.amount) / 10000000000 }} DOT</td>
            
            <div class="btn" >
                <BaseButton @click='goToTx(tx.hash)' >Details</BaseButton>
            </div>
            
            </tr>
                   
        </table>
       
        </div>
         <div class="pagination">
            <div v-show="currentPage > 1"  @click='goPreviousPage' class="previous"> <i class="fas fa-arrow-circle-left"></i> </div>
            <div  class='current-page'> {{currentPage}}</div>
            <div @click='goNextPage'  class="next"> <i class="fas fa-arrow-circle-right"> </i> </div>
        </div>
        <div class="page-text">Page</div>
    </div>
</template>

<script>
import transactionsApi from '../gateways/transactionApis/transactionsApi'
import BaseButton from '../components/BaseButton.vue'

    export default {
        name: 'Transaction',
        data(){
            return {
                currentPage: this.txPage,
                txs: [],
                txPerPage: 24
            }
        },
        components: {
        BaseButton
        },
        props: {
            txPage: String
        },
        methods: {
            goNextPage(){
                let nextPage = parseInt(this.currentPage)+1
                this.$router.push({name:'Transactions', query:{ txPage: nextPage } } )
                 
            },
            goPreviousPage(){
                
                
                let previousPage = parseInt(this.currentPage)-1
                this.$router.push({name:'Transactions', query:{ txPage: previousPage } } )
                 
            },
            goToAccount(id){
                this.$store.dispatch('toggleOnLoading')
                this.$router.push({path: `/accounts/${id.toString()}`})
            },
            goToTx(tx){
                this.$router.push({path: `/transactions/${tx}`})
            }
        } ,
        beforeCreate(){
            this.$store.dispatch('toggleOnLoading')
        }  ,
        created() {
            console.log(this.txPage)
            transactionsApi.get('/count')
            .then(response => {
                let N = response.data[0].count
                console.log('N ' + N)
                let P
                if(!this.txPage) this.currentPage = 1

                P = N - ((this.currentPage - 1) * this.txPerPage)

                console.log('P ' + P)
                

                transactionsApi.get(`/${this.txPerPage}/${P}`)
                .then(response => {
                    this.txs = response.data
                    this.txs.reverse()
                    this.$store.dispatch('toggleOffLoading')
                })
            })
        }
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

.tx-from, .tx-to{
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
     white-space: nowrap; 
    text-overflow:ellipsis; 
    overflow: hidden; 
    max-width:1px;
}

.tx-from:hover {
    color:blue
}

.tx-to:hover {
    color:blue
}



.page-text {
    width: 100%;
    text-align: center;
    font-size: 25px;
}

.block-number{
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.block-number:hover{
    color: blue;
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
    height: 900px;
    border: 2px solid blue;
    border-radius: 10px;
    margin-bottom: 20px;
    
    
}

.transactions-header{
    padding: 0 20px;
    border-bottom: 1px solid;
}

</style>
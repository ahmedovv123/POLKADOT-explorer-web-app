<template>
    <div class="transactions-c" >
        <div class="transactions">
            <div class="transactions-header">
            <h2> <i class="far fa-user"></i>  Accounts</h2>
            </div>
            <table>

            <colgroup>
               
                <col width="10%" />
               <col width="30%" />
                <col width="30%" />
                <col width="15%" />
              

            </colgroup>

            <tr class="header">
         
                <th>Address </th>
                <th>Transactions </th>
                <th>Total Balance  </th>
                <th>Details</th>
               
            </tr>
            <tr v-for="(acc, index) in acc" :key='acc'>
            
            <td class='account-id' @click='goToAccount(acc)'  > {{ acc  }}</td>
            <td  > {{ accountTxsCounts[index]  }}</td>
            <td  > {{ accountBalances[index] }}</td>
           
            
            <div class="btn" >
                <BaseButton @click='goToAccount(acc)' >Details</BaseButton>
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
import accountsApi from '../gateways/accountApis/accountsApi'
import adddressesApi from '../gateways/accountApis/addressesApi'

    export default {
        name: 'Accounts',
        data(){
            return {
                currentPage: this.page,
                accounts: [],
                accountsPerPage: 13,
                accountTxsCounts: [],
                accountBalances:[],
                acc: []
                
                
            }
        },
        components: {
        BaseButton
        },
        props: {
            page: String
        },
        
        methods: {
            getAddressTxCount(addr){
                
              return  adddressesApi.get(`/transactions/count/${addr.toString()}`)
               
               
            },
            goNextPage(){
                let nextPage = parseInt(this.currentPage)+1
                this.$router.push({name:'Accounts', query:{ page: nextPage } } )
                 
            },
            goPreviousPage(){
                
                
                let previousPage = parseInt(this.currentPage)-1
                this.$router.push({name:'Accounts', query:{ page: previousPage } } )
                 
            },
            goToAccount(id){
                this.$store.dispatch('toggleOnLoading')
                this.$router.push({path: `/accounts/${id}`})
            }
        } ,
        beforeCreate(){
            //this.$store.dispatch('toggleOnLoading')
        }  ,
        created() {
            console.log(this.currentPage)
            
             accountsApi.get('/count')
            .then(response => {
                let N = response.data[0].count
                console.log('N ' + N)
                let P
                if(!this.page) this.currentPage = 1

                P = N - ((this.currentPage - 1) * this.accountsPerPage)

                console.log('P ' + P)
                

                transactionsApi.get(`/${this.accountsPerPage}/${P}`)
                .then(response => {
                    this.accounts = response.data
                    this.accounts.reverse()
                    this.accounts.forEach(acc => {
                        this.acc.push(acc.sender)
                        this.acc.push(acc.recipient)

                        
                    })
                    this.acc.forEach(acc => {
                        adddressesApi.get(`/transactions/count/${acc.toString()}`)
                        .then(count => {
                            
                            this.accountTxsCounts.push(count.data[0].count)
                        })

                        adddressesApi.get(`/balance/${acc.toString()}`)
                        .then(balance => {
                            
                            this.accountBalances.push(balance.data.data.free)
                        })
                    })
                    
                    
                    

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

.account-id {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-decoration: underline
}

.account-id:hover {
    color: blue
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
<template>
    <div>
       <AccountBalanceTable :accountId='accountId' :accountBalance='accountBalance' />
       <AccountTransactionsTable :accountTxs='accountTxs' />
        
    </div>
</template>

<script>
import addressesApi from '../gateways/accountApis/addressesApi.js'
import AccountBalanceTable from '../components/AccountBalanceTable.vue'
import AccountTransactionsTable from '../components/AccountTransactionsTable.vue'

    export default {
        name: 'Account',
        components: {
            AccountBalanceTable,
            AccountTransactionsTable
        },
        data(){
            return {
                accountId: '',
                accountBalance: {},
                accountTxs: {}
            }
        },
        beforeCreate(){
            this.$store.dispatch('toggleOnLoading')

        },
        created(){

            this.accountId= this.$route.params.id,
            
            addressesApi.get(`/balance/${this.accountId}`)
            .then(response => {
                this.accountBalance = response.data
                console.log(response)

                addressesApi.get(`/transactions/${this.accountId}`)
                .then(response => {
                    this.accountTxs = response.data
                    console.log(response)
                    this.$store.dispatch('toggleOffLoading')
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

            
    
        },
        mounted(){
            
            // console.log(this.accountBalance)
            // console.log(this.accountTxs)
        }
    }
</script>

<style scoped>

</style>
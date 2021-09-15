<template>
    <div class="block" >
        <div class="block-header">
            <i class="fas fa-cube"></i>
            <h2>Transaction </h2>

        </div>
        <div class="block-body">
            <div class="left">
                <h3>Id</h3>
                <h3>Hash</h3>
                <h3>Signed</h3>
                <h3>Amount</h3>
                <h3>Method</h3>
                <h3>Nonce</h3>
               
                <h3>Sender</h3>
                <h3>Recipient</h3>
                <h3>In block</h3>
            </div>
            <div class="right">
                <h3>{{ tx.id }}</h3>
                <h3>{{ tx.hash }}</h3>
                <h3 style='color: green' >{{tx.issigned}}</h3>
                <h3>{{ parseInt(tx.amount) /10000000000 }} DOT </h3>
                <h3>{{tx.method}}</h3>
                <h3>{{tx.nonce}}</h3>
                
                <h3 class='tx-link' @click="goToAccount(tx.sender)">{{tx.sender}}</h3>
                <h3 class='tx-link' @click="goToAccount(tx.recipient)" >{{tx.recipient}}</h3>
                <h3>{{tx.block_hash}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import txsApi from '../gateways/transactionApis/transactionsApi'
    export default {
        name: 'Transaction',
        methods: {
            goToAccount(id){
                this.$store.dispatch('toggleOnLoading')
                this.$router.push({path: `/accounts/${id.toString()}`})
            },
        },
        data(){
            return{
                txHash: this.$route.params.txhash,
                tx: ''
            }
        },
        beforeCreate(){
             this.$store.dispatch('toggleOnLoading')
        },
        created() {
            txsApi.post(`/hash`, {transactionHash:`${this.txHash}` })
            .then(response => {
                this.tx = response.data[0]
                console.log(this.tx)
                this.$store.dispatch('toggleOffLoading')
            })
        }
    }
</script>

<style scoped>

.tx-link {
    cursor: pointer;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
}

.tx-link:hover {
    cursor: pointer;
    color: blue
}


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
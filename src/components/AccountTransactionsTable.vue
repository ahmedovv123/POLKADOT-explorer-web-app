<template>
    <div class='transactions'>
        <div class="transactions-header">
            <h2>Transactions</h2>
        </div>
        <div class="transactions-body">
            <h2>{{accountTxs}}</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AccountTransactionsTable',
        props: {
            accountTxs: Object
        }
    }
</script>

<style scoped>

</style>
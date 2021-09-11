<template>
    <div>
        <h2>Details for account with id - {{accountId}}</h2>
    </div>
</template>

<script>
    export default {
        name: 'Account',
        data(){
            return {
                accountId: this.$route.params.id
            }
        }
    }
</script>

<style scoped>

</style>
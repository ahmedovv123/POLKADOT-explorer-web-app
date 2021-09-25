<template>
    <div>
        <div class="account-card">
            <div class="header">
              <i class="far fa-user"></i> 
              <h2 >{{accountId}}</h2>
            </div>
            <div class="balance">
                <div class="left">
                    <h3>Fee frozen:  </h3>
                    <h3>Free: </h3>
                    <h3>Misc frozen:  </h3>
                    <h3>Reserved: </h3>
                </div>
                <div  v-if='accountBalance' class="right">
                    <h3 >{{accountBalance.data.feeFrozen}}  </h3>
                    <h3>{{accountBalance.data.free}} </h3>
                    <h3>{{accountBalance.data.miscFrozen}}  </h3>
                    <h3>{{accountBalance.data.reserved}} </h3>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'AccountBalanceTable',
       
        props: {
            accountBalance: Object,
            accountId: String
        }
    }
</script>

<style scoped>
.account-card{
    width: 100%;
    height: 246px;
    border: 2px solid blue;
    border-radius: 10px;
    margin-bottom: 50px;
   
}
i{
    font-size: 30px;
    padding: 20px 20px
}
.account-card .header{
    display: flex;
    color: blue;
    border-bottom: 1px solid;
    
}

.account-card .balance{
    
   
    border-radius: 10px;
    height: 175px;
    width: 99.899%;
    display: flex;
    
   
}

.account-card h3 {
    padding: 0px 20px;
   
}

.balance .left {
    color: blue
}
</style>
<template>
    <div class='inputs'>
        <input @keydown.enter='sendData' placeholder=" Search by block / transaction / account" type="text" v-model="input">
    </div>
</template>

<script>
    export default {
        name: 'TheSearchBar',
        data(){
            return {
                input: ''
            }
        },
        methods: {
            sendData(){
                if(this.input.charAt(0) == '1'){
                    if(this.input.length > 10 ) {
                        console.log('its a account')
                        this.$router.push({path:`/accounts/${this.input}`})
                    }else {
                        this.$router.push({path:`/blocks/${this.input}`})
                        console.log('its a block number')
                    } 
                }else if (this.input.length < 10) {
                    this.$router.push({path:`/blocks/${this.input}`})
                    console.log('its a block number')
                } 
                else if(this.input.substring(0,2) == '0x'){
                    this.$router.push({path:`/transactions/${this.input}`})
                    console.log('its a tx hash')
                } 
            }
        }
    }
    
</script>

<style scoped>
.inputs{
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}
input{
    margin-left: 20px;
    border-radius: 10px;
    width: 100%;
    height: 50px;
    font-family: 'Josefin Sans', sans-serif;
    border: 2px solid grey;
    font-size: 20px;
}

input:focus {
    border: 2px solid blue;
}

input:hover {
    border: 2px solid blue;

}
</style>
 <template>
    <div class="table">
        <router-link to="/blocks"> <h2>Last Blocks</h2> </router-link>
        <table>
            
            <tr class="header">
                <th>Number </th>
                <th class="block-date-header">Date  </th>
                <th>Transactions </th>
            </tr>
            <tr v-for="block in blocks" :key='block.header.number'>
            <td class="block-number" @click='goToBlock(block.header.number)' > {{ parseFloat(block.header.number.replace(/,/g,''))  }}</td>
            <td class="block-date"> {{ blockDate(block.extrinsics[0].method.args[0]) }}</td>
            <td> {{ getTransactionsLength(block.extrinsics) }}</td>
           
            </tr>
            
            
        </table>
        
    </div>
</template>

<script>

    export default {
        name: 'LastBlocksTable',
        data(){
            return {
                timer: '',
                
            }
        },
        computed: {
            blocks: {
                get() {
                    return this.$store.state.blocks
                },
                set(){
                    
                },
            },
            
        },
        created(){
            this.fetchLastBlock()
            this.timer = setInterval(this.fetchLastBlock, 2000)
            
        },
        methods: {
            fetchLastBlock() {
                this.$store.dispatch('fetchBlock')
               
                if(this.blocks.length > 13) 
                this.$store.dispatch('clearBlocks')
                
            },
            cancelAutoUpdate(){
                clearInterval(this.timer)
            },
            blockDate(timestamp){
                let seconds = parseFloat(timestamp.replace(/,/g,''))
                
                let blockDate = new Date(seconds).toLocaleString('bg-BG')
                
                return blockDate
            },
            getTransactionsLength(extrinsics){
                return extrinsics.filter(ex => ex.method.method == 'transfer' || ex.method.method == 'transfer_keep_alive' ).length
            },
            goToBlock(blockNumber){
                let block = parseFloat(blockNumber.replace(/,/g,''))
                this.$store.dispatch('toggleOnLoading')
                this.$router.push({path: `/blocks/${block}`})
            }
        },
        beforeDestroy(){
            this.cancelAutoUpdate();
        },
        
        
    }
</script>

<style scoped>

.block-number{
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.block-number:hover{
    color: blue;
}

.block-date-header {
    border-left: 2px solid grey;
    border-right: 2px solid grey;
}

.block-date  {
    border-left: 2px solid grey;
    border-right: 2px solid grey;
}

table tr th {
    border-bottom: 2px solid grey;
    padding: 10px;
   
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

.table a {
    text-decoration: none;
}
.table{
    display: flex;
    flex-direction:column;
    justify-content: center;
    font-size: 19px;
    
    
}
</style>
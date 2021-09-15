<template>
    <div class="blocks-c" >
        <div class="blocks">
            <div class="blocks-header">
            <h2> <i class="fas fa-cube"> </i> Blocks</h2>
            </div>
            <table>

            <tr class="header">
                <th>Number </th>
                <th>Date  </th>
                <th>Block hash </th>
                <th>Signed Extrinsics </th>
                <th>Details</th>
               
            </tr>
            <tr v-for="(block, index) in blocks" :key='block.header.number'>
            <td class="block-number" @click='goToBlock(block.header.number)' > {{ parseFloat(block.header.number.replace(/,/g,''))  }}</td>
            <td class="block-date"> {{ blockDate(block.extrinsics[0].method.args[0]) }}</td>
            
            <td>{{blockHashes[index]}}</td>
            
            <td> {{ getSignedExtrinsics(block.extrinsics) }}</td>
            <div class="btn" >
                <BaseButton @click='goToBlock(block.header.number)' >Details</BaseButton>
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
import blocksApi from '../gateways/blockApis/blocksApi'
import BaseButton from '../components/BaseButton.vue'
    export default {
        name: 'Blocks',
        components: {
            BaseButton
        },
       
        data(){
            return {
                blocks: [],
                blockHashes: [],
                blocksPerPage: 19,
                currentPage: this.page
               
            }
        },
        methods: {
            goNextPage(){
                let nextPage = parseInt(this.currentPage)+1
                this.$router.push({name:'Blocks', query:{ page: nextPage } } )
                 
            },
            goPreviousPage(){
                
                
                let previousPage = parseInt(this.currentPage)-1
                this.$router.push({name:'Blocks', query:{ page: previousPage } } )
                 
            },
            blockDate(timestamp){
                let seconds = parseFloat(timestamp.replace(/,/g,''))
                
                let blockDate = new Date(seconds).toLocaleString('bg-BG')
                
                return blockDate
            },
             getSignedExtrinsics(extrinsics){
                return extrinsics.filter(ex => ex.isSigned ).length
            },
            goToBlock(blockNumber){
                let block = parseFloat(blockNumber.replace(/,/g,''))
                this.$store.dispatch('toggleOnLoading')
                this.$router.push({path: `/blocks/${block}`})
            }
        },
        props: {
            page: String
        },
        beforeCreate(){
            this.$store.dispatch('toggleOnLoading')
        },
        created() {

            blocksApi.get()
            .then(response => {
                let N = parseFloat(response.data.block.header.number.replace(/,/g,''))
                let P
                if(!this.page) this.currentPage = 1
                P = N - ((this.currentPage - 1) * this.blocksPerPage)
                
                blocksApi.get(`/${this.blocksPerPage}/${P}`)
                .then(response => {
                    let blockHashes = response.data
                    this.blockHashes = response.data
                    console.log(this.blockHashes)

                    for(let i = 0; i < blockHashes.length; i++){
                        blocksApi.post(`/hash`, {'hash':blockHashes[i]})
                        .then(response => {
                            this.blocks.push(response.data.block)
                            if(i == blockHashes.length-1)
                            this.$store.dispatch('toggleOffLoading')
                        })
                    }
                   
                    
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

.blocks{
    width: 100%;
    height: 900px;
    border: 2px solid blue;
    border-radius: 10px;
    margin-bottom: 20px;
}

.blocks-header{
    padding: 0 20px;
    border-bottom: 1px solid;
}
</style>
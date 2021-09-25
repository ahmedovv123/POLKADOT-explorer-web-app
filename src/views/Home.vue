<template>
  <div class="home">
    <TheSearchBar v-once/>
    <TheDetailsCard />
    <div class="blocks-tx" >
      <div class="blocks" >
        <LastBlocksTable />
      </div>
      <div class="txs">
        <LastTransactionsTable />
      </div>
    </div>

  </div>
</template>

<script>

import TheSearchBar from '../components/TheSearchBar.vue'
import TheDetailsCard from '../components/TheDetailsCard.vue'
import LastBlocksTable from '../components/LastBlocksTable.vue'
import LastTransactionsTable from '../components/LastTransactionsTable.vue'


export default {
  name: 'Home',
  components: {
    TheSearchBar,
    TheDetailsCard,
    LastTransactionsTable,
    LastBlocksTable
  }
}
</script>

<style scoped>
.blocks-tx {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 500px;
  margin-bottom: 100px;
  
  
}

.blocks, .txs {
  width: 47%;
  height: 100%;
  border: 2px solid grey;
  border-radius: 10px;
  overflow:hidden;
  transition: all 0.3s ease-in-out;
}

.blocks:hover {
  border: 2px solid blue;
}

.txs:hover{
  border: 2px solid blue;
}


</style>
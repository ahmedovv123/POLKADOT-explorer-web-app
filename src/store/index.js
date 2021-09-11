import { createStore } from 'vuex'
import blockApi from '../gateways/blockApis/blocksApi'

export default createStore({
    state: {
        blocks: [],
        transactions: [],
        isLoading: false
    },
    mutations: {
        toggleLoading(state) {
            state.isLoading = !state.isLoading
        },
        fetchBlock(state, block){
            state.blocks.unshift(block)
            
        },
        clearBlocks(state){
            state.blocks.pop()
        },
        fetchTransaction(state, tx){
            state.transactions.unshift(tx)
            
        },
        clearTransactions(state){
            state.transactions.pop()
        },
    },
    actions: {
        toggleLoading({commit}){
            commit('toggleLoading')
        },
        fetchBlock({ commit }){
            
            blockApi.get()
            .then(response => {
                commit('fetchBlock',response.data.block)
            })
        },
        clearBlocks({commit}){
            commit('clearBlocks')
        },
        fetchTx({ commit }){
            
            blockApi.get()
            .then(response => {
                
                response.data.block.extrinsics.map(ex => {
                    if(ex.method.method == 'transfer')
                    commit('fetchTransaction',ex)
                })
                

                
            })
        },
        clearTx({commit}){
            commit('clearTransactions')
        }
    },
    getters: {
        getBlock(state){
            return state.blocks
        },
        getTransactions(state) {
            return state.transactions
        }

    },
    modules: {

    },
    
})
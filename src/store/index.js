import { createStore } from 'vuex'
import blockApi from '../gateways/blockApis/blocksApi'

export default createStore({
    state: {
        blocks: [],
        transactions: [],
        isLoading: false,
        
    },
    mutations: {
        toggleOffLoading(state) {
            state.isLoading = false
        },
        toggleOnLoading(state) {
            state.isLoading = true
        },
        fetchBlock(state, block){
            if(!state.blocks.some(e => e.header.number === block.header.number)){
                
                state.blocks.unshift(block)
            }
            
            
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
        toggleOffLoading({commit}){
            commit('toggleOffLoading')
        },
        toggleOnLoading({commit}){
            commit('toggleOnLoading')
        },
        fetchBlock({ commit, state }){
            
            blockApi.get()
            .then(response => {
                commit('fetchBlock',response.data.block)
                
                if(state.blocks.length > 13) 
                commit('clearBlocks')
            })
        },
        clearBlocks({commit}){
            commit('clearBlocks')
        },
        fetchTx({ commit }){
            
            blockApi.get()
            .then(response => {
                
                response.data.block.extrinsics.map(ex => {
                    
                    if(ex.method.method == 'transfer'){
                        
                        commit('fetchTransaction',ex)
                    }
                   
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
        },
        getLoading(state){
            return state.isLoading
        }

    },
    modules: {

    },
    
})
<template>

  <TheNavBar v-once />
  <div v-show='isLoading' >
     <TheSpinner />
  </div>
 
  <TheContainer>
    
    <router-view :key="$route.fullPath"/>
   
  </TheContainer>
  <TheFooter v-once/>
 
</template>

<script>
import TheNavBar from './components/TheNavBar.vue'
import TheContainer from './components/TheContainer.vue'
import TheFooter from './components/TheFooter.vue'
import TheSpinner from './components/TheSpinner.vue'
import {mapState} from 'vuex'

export default {
  name:'App',
  components: {
    TheNavBar,
    TheContainer, 
    TheFooter,
    TheSpinner
    
  },
  computed: {
    //isLoading: this.$store.getters.getLoading
    ...mapState({
      isLoading: state=> state.isLoading
    })
  },
  watch: {
    isLoading(){
      console.log('toggle')
    }
  }

}
</script>

<style>

#app {
  font-family: 'Josefin Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>

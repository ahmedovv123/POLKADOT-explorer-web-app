<template>

  <TheNavBar v-once />
  <TheContainer>
    
    <router-view/>
   
  </TheContainer>
  <TheFooter v-once/>
 
</template>

<script>
import TheNavBar from './components/TheNavBar.vue'
import TheContainer from './components/TheContainer.vue'
import TheFooter from './components/TheFooter.vue'



export default {
  name:'App',
  components: {
    TheNavBar,
    TheContainer, 
    TheFooter,
    
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

<template>
  <div class="home">
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <BlocksCount/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BlocksCount from '@/components/BlocksCount.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    BlocksCount
  }
}
</script>


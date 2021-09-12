<template>
    <div id="nav">
      
    
    <router-link to="/"> <i class="fas fa-globe"></i> Polkadot Explorer</router-link> 
      
    <div class="nav-links" >
   
    <router-link class='nav-link' to="/blocks">  <i class="fas fa-cube"></i> Blocks</router-link> 
    <router-link class='nav-link' to="/accounts">  <i class="far fa-user"></i>  Accounts</router-link> 
    <router-link class='nav-link' to="/transactions"> <i class="fas fa-file-signature"></i> Transactions</router-link>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'TheNavBar',
        
    }
</script>

<style scoped>

#nav {
  display: flex;
  justify-content: space-between;
  padding: 30px 210px;
  font-family: 'Josefin Sans', sans-serif;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 49%, rgba(0,212,255,1) 100%); 
  margin-bottom: 50px;
}

.logo {
  height: 100px;
  width: 100px;
}

#nav a {
  text-decoration: none;
  font-weight: bold;
  color: white;
  margin: 0 20px;
  transition: all 0.3s ease-in-out;
}

#nav a:hover {
color: grey;
}

.nav-link-underline{
    border-bottom: 1px solid white;
}
</style>
<template>

<div class="col-3"><h3>Polkadot Explorer:</h3></div>
  <div id="nav" class="col-12git reflog">
    
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      
      <div class="container">
    <router-link to="/">Home</router-link> |
    

<div class="nav-item dropdown " style="white-space: nowrap;" >
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blocks</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/blocks/number">Search for Block by Number</router-link></li>
            <li><router-link to="/blocks/number/x">Get X Blocks</router-link></li>
            <li><router-link to="/blocks/hash">Search for Block by Hash</router-link></li>
          </ul>
        </div>
            |
        <div class="nav-item dropdown" style="white-space: nowrap;">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Transactions</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/">Get X Unconfirmed transactions</router-link></li>
            <li><router-link to="/transactions/hash">Get Transaction by Hash</router-link></li>
          </ul>
        </div>
              |
              
        <div class="nav-item dropdown" style="white-space: nowrap;">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Accounts</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/address">Get data for address</router-link></li>
            <li><router-link to="/address/transactions">Search Transactions of Address</router-link></li>
          </ul>
        </div>



    
     </div>
     </nav>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  
  padding: 30px;
  padding-top: 0;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

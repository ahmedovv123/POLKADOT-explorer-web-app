<template>
    <div class="footer">
        <div class="links">
            <div class="link" ><i class="fab fa-github"></i> GitHub</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TheFooter'
    }
</script>

<style scoped>
.footer {
    height: 50px;
  
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 49%, rgba(0,212,255,1) 100%); 
  color: white;
  text-align: center;
  
  
}

.links {
    display: flex;
    justify-content: center;
    padding: 15px;
    
}

.link {
    cursor: pointer;
    transition: all 0.1s ease-in-out;
}

.link:hover {
    margin-top: -2px;
}
</style>
<template>
    <div>
        <button><slot></slot></button>
    </div>
</template>

<script>
    export default {
        name: 'BaseButton'
    }
</script>

<style scoped>

button {
    padding: 5px 10px;
    width: 70px;
    height: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    
    border-radius: 5px;
    background-color: white;
    font-family: 'Josefin Sans', sans-serif;
    color:blue;
}

button:hover {
    background-color: blue;
    color:white;
}

</style>
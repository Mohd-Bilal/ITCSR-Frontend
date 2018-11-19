<template>
 <button @click="logout">Logout</button>    
</template>



<style>
button{
    width: 60px;
    height: 4vh;
}
</style>

<script>
var username, password;
export default {
    methods:{
        logout(){
            this.$store.commit('setAuthToken',null);
            console.log("Logout")
            this.$router.push('/')
        }       
}
}
</script>

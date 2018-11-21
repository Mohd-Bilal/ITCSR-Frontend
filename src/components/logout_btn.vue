<template>
 <button id="btnLogout" @click="logout">Logout</button>    
</template>



<style>
#btnLogout{
    position:absolute;
    left:70%;
    top:14%;
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

<template>
    <div>
    <navbar></navbar>
    <div class="form">
    <label>Input</label><br>
   
            <input v-model="input" type="text"><br>
            <input v-model="input" type="text"><br>
            <input v-model="input" type="text"><br>
        
        
            <button @click="test" class="but">Hello</button>
        
    </div>
    </div>
</template>
<style>
.form{
  width:60vw;
  background-color:#900C3F;
  margin:auto;
  text-align: center;
  margin-top: 2vw;
  padding-top:20px;
  padding-bottom: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
input{
  margin:20px;
  width:50vw;
  background: transparent;
  padding: 2vw;
  border-top:none;
  border-left: none;
  border-right:none;
  border-bottom-color: #d3286a;
}
label{
  font-size: 30px;
  color:white;
  font-family: sans-serif;
}


.but{
  background: white;
  color:#282728;
  font-size: 20px;
  padding:0.5vw;
  border: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  text-decoration: none;
}


</style>
<script>
import navbar from "../components/navbar.vue";
var input;
export default {
  components: {
    navbar
  },
  data() {
    return {
      input
    };
  },
  methods: {
    test: function() {
      console.log(this.input);
    }
  }
};
</script>

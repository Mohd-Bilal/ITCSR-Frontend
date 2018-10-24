<template>
    <div>
    <navbar></navbar>
    <label>Input</label>
   
            <input v-model="input" type="text">
            <input v-model="input" type="text">
            <input v-model="input" type="text">
        
        
            <button @click="test">Hello</button>
        
    </div>
</template>
<style>
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

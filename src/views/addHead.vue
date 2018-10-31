<template>
<div id="central">
  <!-- <dropdown :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect"></dropdown> -->
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<input v-if="seen===true" v-model="message" placeholder="Fund"/>
<button v-if="seen===true" v-on:click="addhead">Add</button>
<div>
<ul>
<li v-for="head in heads">
    {{head.head}}  {{head.fund}}
</li>
</ul>
</div>
</div>
</template>

<style>
ul.reset,
ul.reset li,
ul.reset ul li{
  margin : 0;
  padding: 0;
  text-indent: 0;
  list-style-type: 0;
  display: block;
}
#central{
  align:center;
  margin: 0 auto;
}
</style>
<script>

//import dropdown from 'vue-dropdowns';

export default {
        data() {
          return {
            arrayOfObjects: [{name:'Machinery'},{name:'Manpower'},{name:'Consumables'},{name:'Travel'}],
            object: {
             name: 'Select head'
            },
            message:"",
            seen:false,
            heads:[]
          }
        },

        

        methods: {
          methodToRunOnSelect(payload) {
            this.object = payload;
            this.seen= true;
          },
          addhead(){
              let temp ={
                  "head":this.object.name,
                  "fund":this.message
              }
              this.message="";
              this.heads.push(temp);
              console.log(this.heads);
          }
        }
      }
</script>


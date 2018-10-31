<template>
<div id="central">
  <!-- <dropdown :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect"></dropdown> -->
<select @click="fetchAllHeads" v-model="selected"  >
  <option disabled value="">Please select one</option>
  <option @click="methodToRunOnSelect(head.head_id)" v-for="head in heads" :key="head.head_id" >{{head.name}}</option>

  <!-- <option >B</option>  
  <option>C</option> -->
</select>
<input v-if="seen===true" v-model="fund" placeholder="Fund"/>
<button v-if="seen===true" v-on:click="addhead">Add</button>

</div>
</template>

<style>
ul.reset,
ul.reset li,
ul.reset ul li {
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: 0;
  display: block;
}
#central {
  text-align: center;
  margin: 0 auto;
}
</style>
<script>
//import dropdown from 'vue-dropdowns';l
var selected,fund,selected_id,heads;
export default {
  data() {
    return {
      fund,
      seen: false,
      selected,
      selected_id,
      heads
      // heads: [{id:1,name:"Mach"},{id:2,name:"Trave"},{id:3,name:"manpowe"}]
    };
  },

  methods: {
    fetchAllHeads() {
      // Get the modal
      var self = this;
      const url = "http://localhost:3000/heads/getAll";
      window
        .axios({ url: url, method: "GET" })
        .then(function(result) {
          console.log(result);

          self.heads = result.data.Status;
          // var modal = document.getElementById("myModal");
          // var span = document.getElementsByClassName("close")[0];

          // modal.style.display = "block";

          // window.onclick = function(event) {
          //   if (event.target == modal) {
          //     modal.style.display = "none";
          //   }
          // };
        })
        .catch(function(err) {
          // Pis = "Error";
        });
    },
    methodToRunOnSelect(head_id) {
      console.log(head_id)
      this.selected_id = head_id;
      this.seen = true;
    },
    validate(){
      return (this.selected && this.fund);
        
    },
    addhead() {
      var self = this;
      if (this.validate()) {
        var request = {};
        // request.project_id = null;
        request.project_id = self.$store.state.project_id;
        request.head_id = this.selected_id;
        request.fund = this.fund;
        console.log(request);
        window
          .axios({
            url: "http://localhost:3000/headsUnderProject/create",
            method: "POST",
            data: request
          })
          .then(function(result) {
            if (result.data.success) console.log("Success");
            else console.log(result);
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert("fill'em up");
      }
    }
  }
};
</script>


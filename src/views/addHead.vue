<template>
<div id="central">
<div id="dropdownDiv">
  <h1>Add Heads</h1>
  <hr>
  <h3>Head:</h3><select @click="fetchAllHeads" v-model="selected"  >
  <option disabled value="">Please select one</option>
  <option @click="methodToRunOnSelect(head.head_id)" v-for="head in heads" :key="head.head_id" >{{head.name}}</option>

  <!-- <option >B</option>  
  <option>C</option> -->
</select>
<input v-if="seen===true" v-model="fund" placeholder="Fund"/>
<button v-if="seen===true" v-on:click="addhead">Add</button>
</div>
<ul class="heads">
  <li v-for="added_head in added_heads" >{{added_head.head}} {{added_head.fund}}</li>
</ul>
</div>
</template>

<style>
#dropdownDiv{
  margin-top:10%;

}

#dropdownDiv select{
  margin-left:1vw;
}
#dropdownDiv h1{
  text-align: left;
}

#dropdownDiv h3{
  display:inline-block;
  margin-left: 7vw;
}
.heads{
  padding-left:8vw;
  text-align: left;
}

.heads li{
  font-size:20px;
}

#central {
  padding-left: 20%;
  padding-right: 20%;
  margin: 0 auto;
}
</style>
<script>
//import dropdown from 'vue-dropdowns';l
var selected,fund,selected_id,heads,added_heads=[];
export default {
  data() {
    return {
      fund,
      seen: false,
      selected,
      selected_id,
      heads,
      added_heads
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
        request.project_id = 10;
        // request.project_id = self.$store.state.project_id;
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
            if (result.data.success) {
              console.log("Success");
              console.log(self.selected);
              console.log(self.fund)
              self.added_heads.push({"head":self.selected,"fund":self.fund})
              console.log(self.added_heads[0].head);
              console.log("evide");
            }
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


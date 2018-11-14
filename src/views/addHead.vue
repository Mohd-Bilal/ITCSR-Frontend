<template>
<div id="central">
<div id="dropdownDiv">
  <h1>Add Heads</h1>
  <hr>
  <h3>Head:</h3><select @click="fetchAllHeads" v-model="selected"  >
  <option disabled value="">Please select one</option>
  <option @click="methodToRunOnSelect(head.head_id)" v-for="head in heads" :key="head.head_id" >{{head.name}}</option>
  <option @click="displayModal">Add New Head</option>
  <!-- <option >B</option>  
  <option>C</option> -->
</select>
<input v-if="seen===true" v-model="fund" placeholder="Fund"/>
<button v-if="seen===true" v-on:click="addhead">Add</button>
</div>
<div id="myModal" class="modal">

  <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Add new Head</h2><hr>
        <div>
          <input type="text" v-model="headName" placeholder="Head name">
          <input type="text" placeholder="description" v-model="description">
            <table class="table">
              <thead>
                  <tr>
                      <td><strong>Parameter Name</strong></td>
                      <td></td>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(row, index) in rows">

                      <td><input type="text" v-model="row.parameter"></td>
                      <td>
                          <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
                      </td>


                  </tr>
              </tbody>
          </table>
          
          <div>
              <button class="button btn-primary" @click="addRow">Add row</button>
          </div>
          <button @click="saveNewHead">Save</button>
        </div>
      </div>

    <div class="modal-body" >
      <ul>
        <!-- <li @click="selectedPI(Pi.people_id,Pi.name)" v-for="Pi in Pis" :key="Pi.people_id">
            {{Pi.name}}
        </li> -->
       </ul>
    </div>

    <div class="modal-footer">
      <h3>Select the PI from above</h3>
    </div>

    </div>

  </div>
<ul class="heads">
  <li v-for="added_head in added_heads" >{{added_head.head}} {{added_head.fund}}</li>
</ul>
</div>
</template>

<style>
#dropdownDiv {
  margin-top: 10%;
}

#dropdownDiv select {
  margin-left: 1vw;
}
#dropdownDiv h1 {
  text-align: left;
}

#dropdownDiv h3 {
  display: inline-block;
  margin-left: 7vw;
}
.heads {
  padding-left: 8vw;
  text-align: left;
}

.heads li {
  font-size: 20px;
}

#central {
  padding-left: 20%;
  padding-right: 20%;
  margin: 0 auto;
}
</style>
<script>
//import dropdown from 'vue-dropdowns';l
var selected,
  fund,
  selected_id,
  heads,
  added_heads = [],
  rows = [],
  headName,
  description;
export default {
  data() {
    return {
      fund,
      seen: false,
      selected,
      selected_id,
      heads,
      added_heads,
      rows: [],
      description,
      headName
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
        })
        .catch(function(err) {
          // Pis = "Error";
        });
    },
    methodToRunOnSelect(head_id) {
      console.log(head_id);
      this.selected_id = head_id;
      this.seen = true;
    },
    validate() {
      if (this.$store.state.project_id === -1) {
        return false; //
      }
      return this.selected && this.fund;
    },
    addhead() {
      var self = this;
      if (this.validate()) {
        var request = {};
        // request.project_id = 10;
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
            if (result.data.success) {
              console.log("Success");
              console.log(self.selected);
              console.log(self.fund);
              self.added_heads.push({ head: self.selected, fund: self.fund });
              console.log(self.added_heads[0].head);
              console.log("evide");
            } else console.log(result);
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert("fill'em up OR project_id NULL");
      }
    },
    displayModal() {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    closeModal() {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
      console.log(this.rows[0].parameter);
    },
    addRow: function() {
      var elem = document.createElement("tr");
      this.rows.push({
        parameter: ""
      });
    },
    removeElement: function(index) {
      this.rows.splice(index, 1);
    },
    saveNewHead() {
      this.closeModal();
      console.log("Head name:"+this.headName);
      console.log("Head description:"+this.description);
      
      const url = "http://localhost:3000/heads/createWithParameters";
      var self = this;
      var info = {};
      var newHead = {};
      var parameters = [];
      newHead.name = this.headName;
      newHead.remark = this.description;
      info["head_info"] = newHead;
      
      var count = 1;
      self.rows.forEach(row => {
        var params = new Object();
        // params.head_id = res.data.Status.head_id; done at backend
        params.parameter_id = count;
        params.parameter_name = row.parameter;
        parameters.push(params);
        count++;
      });

      console.log("parameters:"+parameters);
      info["parameter_info"] = parameters;
      
      window
        .axios({ url: url, method: "POST", data: info })
        .then(function(res) {
          console.log("Successfully added heads and parameters");
        })
        .catch(err => {
          console.log("error:" + err);
        });
    }
  }
};
</script>

<template>
   <div style="margin-top:10vh;">
     <h1 style="padding-left:20%;">Create Proposal</h1>
     <div style="padding-left:22%;padding-right:22%;">
        <h3>Project name</h3>
        <input v-model="name" type="text" name="name" required><br><br>
        <p>Date of approval :</p> <input v-model="date" type="date" name="Date of approval" required><br><br>
        <hr>
        <div class="piDiv">
            <p style="display:inline-block;">Principal Investigator : </p><p id="piname"></p>
            <button id="btn" @click="fetchAllPI" style="
            margin-left:2vw;
            width:8vw;height:4vh;
            display:inline-block;
            "
            >Select PI</button><br><br>
        </div>
        <p style="margin-top:0px;">Project description :</p>
        <textarea rows="7" cols="50" v-model="description">Project about...</textarea><br><br>
        <hr>
        
        <div>
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </div>
        <div>
          <p>I hereby state that the above data is valid.</p>
          <button @click="submitProposal" submitstyle="
            margin-top:10px;
            width:14vw;height:5vh;
            display:inline-block;
            "> Submit</button>
        </div>
     </div>

  <!-- The Modal -->
  <div id="myModal" class="modal">

  <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Principal Investigators list</h2><hr>
      </div>

    <div class="modal-body" >
      <ul>
        <li @click="selectedPI(Pi.people_id,Pi.name)" v-for="Pi in Pis" :key="Pi.people_id">
            {{Pi.name}}
        </li>
       </ul>
    </div>

    <div class="modal-footer">
      <h3>Select the PI from above</h3>
    </div>

    </div>

  </div>

  </div>
</template>

<style>
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-header {
  padding: 2px 16px;
  background-color: white;
  color: black;
}

/* Modal Body */
.modal-body {
  padding: 2px 16px;
}

/* Modal Footer */
.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
}

#piname {
  visibility: hidden;
  display: inline-block;
}

/* Add Animation */
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script>
var Pis, items, name, date, piid, description,file;
export default {
  data() {
    return {
      Pis,
      name,
      date,
      piid,
      description,
      file
    };
  },
  //   mounted() {
  //     console.log(document.getElementById("btn"));
  //   },
  methods: {
    handleFileUpload(){
    this.file = this.$refs.file.files[0];
    // console.log(this)
    // console.log(this.$refs)
    // console.log(this.$refs.file.files[0])
    // console.log(this.file);
  },
    fetchAllPI() {
      // Get the modal
      var self = this;
      const url = "http://localhost:3000/proposal/getAllPI";
      window
        .axios({ url: url, method: "POST" })
        .then(function(result) {
          self.Pis = result.data.data;
          console.log(self.Pis)
          var modal = document.getElementById("myModal");
          var span = document.getElementsByClassName("close")[0];

          modal.style.display = "block";

          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          };
        })
        .catch(function(err) {
          Pis = "Error";
        });
    },
    closeModal() {
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "none";
    },
    selectedPI(id, name) {
      document.getElementById("btn").innerHTML = "Change PI";
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
      var piname = document.getElementById("piname");
      piname.innerHTML = name;
      piname.style.visibility = "visible";
      this.piid = id;
    },
    validate(){
      console.log("MAAAN");
      if(this.piid&&this.name&&this.date){
        return true;  }
      else return false;
    },
    submitProposal() {
      // console.log(this.piid+" "+this.name+" "+this.date);
      var self = this
      if(this.validate()){
      var request = {};
      // request.project_id = null;
      request.principal_investigator_id = this.piid;
      request.name = this.name;
      request.data = {};
      request.data.description = this.description;
      request.start_date = this.date;
      request.file = this.file;
      let formData = new FormData();
      console.log(self.file)
      formData.append('file',self.file);
//       formData.append('username', 'Chris'); 
//       formData.append('request',request) 
//       for (var p of formData) {
//   console.log(p);
// }
      window
        .axios({
          url: "http://localhost:3000/proposal/create",
          method: "POST",
          data: request
        })
        .then(function(result) {
          if (result.data.success){ 
            console.log("Success");
            window.axios({
              url:"http://localhost:3000/file/",
              method:'POST',
              data:formData,
              headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(
              function(result2){
                console.log("eviddddd")
                  console.log(result.data);
            self.$store.commit('setProjectID',result.data.status.project_id);
            // console.log(self.$store.state.project_id)r
            self.$router.push("/addHead");
              }
            )
            
          }
          else console.log(result);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    else{
      alert("fill'em up");
    }
    }
  }
};
</script>

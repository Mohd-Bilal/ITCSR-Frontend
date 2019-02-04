<template>
    <div style="padding-left:22%;padding-right:22%;">
    <h1 style="padding-left:20%;">Submit a Request</h1>
     <div style="padding-left:22%;padding-right:22%;">
         <div>
         <span>Project : </span>
         <select @click="fetchAllProjectsUnderPI" v-model="selected_project_id"  >
  <option disabled value="">Please select one</option>
  <option  v-for="project in projectsUnderPI" :key="project.project_id" v-bind:value="project.project_id" >{{project.name}}</option>
  
</select>
         </div>
        <br><br>
         <div>
         <span>Head : </span>
         <select  @click="fetchHeadsUnderProject" v-model="selected_head_id" @change="onChange(selected_head_id)" >
  <option disabled value="">Please select one</option>
 <option  v-for="head in headsUnderProject" :key="head.head_id" v-bind:value="head.head_id">{{head.name}}</option>
</select>
         </div>
         <br><br>
         <div v-for="param in parameters" v-bind:key="param.parameter_id">
             <span>{{param.parameter_name}} : </span>
             <input type="text" :v-bind="param.pa" v-model="param.value"/><br><br>
         </div>
         <div>
             <p style="margin-top:0px;">Project description :</p>
        <textarea rows="7" cols="50" v-model="description">Project about...</textarea><br><br>
         </div>
         <div>
         <br>
         <p>Date of approval :</p> <input v-model="date" type="date" name="Date of approval" required><br><br>
         </div>
         <div>
             <p>Request of fund</p><input v-model="fund" type="text" name="Fund" required><br><br>
         </div>
         <div>
          <p>I hereby state that the above data is valid </p>
          <button @click="submitProposal" submitstyle="
            margin-top:10px;
            width:14vw;height:5vh;
            display:inline-block;
            "> Submit</button>
        </div>
     </div>
    </div>
</template>
<style>
textarea { 
   /* will prevent resizing horizontally */
   resize:vertical;
}</style>
<script>
var date, fund;
var PI,
  projectsUnderPI,
  parameters = [],
  projectID,
  selected_project_id,
  description,
  project_name,
  headsUnderProject,
  head_name,
  head_ids,
  selected_head_id;
export default {
  data() {
    return {
      PI,
      projectsUnderPI,
      projectID,
      project_name,
      selected_project_id,
      headsUnderProject,
      head_name,
      head_ids: [],
      selected_head_id,
      fund,
      description,
      date,
      parameters
    };
  },

  methods: {
    fetchAllProjectsUnderPI() {
      //get PI id from vueex
      this.PI = this.$store.state.user_id;

      console.log(this.PI);
      var self = this;
      const url = "http://localhost:3000/proposal/getAllProjectsUnderPI";
      window
        .axios({ url: url, method: "POST", data: { PI_ID: self.PI } })
        .then(function(result) {
          self.projectsUnderPI = result.data.Status;

          console.log(result.data.Status);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    fetchHeadsUnderProject() {
      var self = this;
      console.log("selected project  id");
      console.log(self.selected_project_id);
      const url = "http://localhost:3000/headsUnderProject/getAll";
      window
        .axios({
          url: url,
          method: "POST",
          data: { project_id: self.selected_project_id }
        })
        .then(function(result) {
          self.headsUnderProject = result.data.Status;
          console.log(self.headsUnderProject);
          console.log("fetched heads under project");
          console.log(result.data.Status);
          return self.headsUnderProject;
        })
        .then(function(result) {
          self.head_ids = [];
          result.forEach(ele => {
            self.head_ids.push(ele.head_id);
          });
          console.log("head ids");
          console.log(self.head_ids);
          return result;
        })
        .then(function(res) {
          var token = self.$store.state.token;

          // console.log(self.head_ids);
          const url = "http://localhost:3000/heads/getMultipleHeads";
          return window.axios({
            url: url,
            method: "POST",
            data: { head_ids: self.head_ids,"token":token }
          });
        })
        .then(function(res2) {
          console.log("got heads");
          self.headsUnderProject = res2.data.Status;
          // res2.data.Status.forEach(row=>{
          //     self.headsUnderProject.push(row.name);
          // })
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    submitProposal() {
      var description = {};
      var param_info = [];
      var request_options = {};
      var self = this
      // request_options.request_id = 2;
      this.parameters.forEach(param => {
        var parameter = new Object();
        parameter.parameter_id = param.parameter_id;
        parameter.parameter_name = param.parameter_name;
        parameter.parameter_value = param.value;
        param_info.push(parameter);
      });
      description.parameter = param_info;
      description.remark = this.description;
      request_options.project_id = this.selected_project_id;
      request_options.head_id = this.selected_head_id;
      request_options.description = description;
      request_options.date = this.date;
      request_options.approval_level = 1;
      request_options.estimated_amount = this.fund;
      console.log(request_options);
      const url = "http://localhost:3000/request/create";
      window
        .axios({ url: url, method: "POST", data: request_options })
        .then(function(res) {
          console.log(res);
          if (res.data.success) {
            console.log("Successfull addition");
            self.$router.push('/requestdashboard')
          } else {
            console.log("error:" + res.data.error);
          }
        })
        .catch(err => {
          console.log("Add aayilla -_-");
        });
    },
    onChange(head_id) {
      const options = {};
      this.parameters = [];
      var self = this;
      options.head_id = head_id;
      const url =
        "http://localhost:3000/parametersUnderHeads/getParametersUnderHead";
      window
        .axios({ url: url, method: "POST", data: options })
        .then(res => {
          console.log("Parameters under Head retrieved");
          console.log(res.data.Status);
          res.data.Status.forEach(ele => {
            self.parameters.push(ele);
          });
        })
        .catch(err => {
          console.log("error kitunilla-_-");
        });
    }
  }
};
</script>

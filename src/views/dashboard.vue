<template>
    <div>
    <!-- <navbar></navbar> -->
    <div class="form">
    <label>Project Id</label><br>
    <input v-model="projectId" type="text"><br>
    <label>File Number</label><br>
    <input v-model="fileNumber" type="text"><br>
    <label>Principal Investigator Id</label><br>
    <input v-model="principalInvestigatorId" type="text"><br>
    <label>Project Name</label><br>
    <input v-model="projectName" type="text"><br>
    <label>Data</label><br>
    <input v-model="data" type="text"><br>
    <label>Start Date</label><br>
    <input v-model="startDate" type="text"><br>
    <label>Duration</label><br>
    <input v-model="duration" type="text"><br>
    <button @click="test" class="but">Hello</button>
        
    </div>
    </div>
</template>
<style>
/* .form{
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
 */

</style>
<script>
import navbar from "../components/navbar.vue";
var projectId,fileNumber,principalInvestigatorId,projectName,data,startDate,duration;
export default {
  components: {
    navbar
  },
  data() {
    return {
      projectId,fileNumber,principalInvestigatorId,projectName,data,startDate,duration
    };
  },
  methods: {
    test: function() {
      var request = {}
      request.project_id = this.projectId
      request.file_no = this.fileNumber
      request.principal_investigator_id = this.principalInvestigatorId
      request.name = this.projectName
      request.data = {}
      request.data.inp = this.data
      request.start_data = this.startDate
      request.duration = this.duration
      window.axios({url:'http://localhost:3000/proposal/create',method:'POST',data:request})
      .then(function(result){
        if(result.data.success)
          console.log("Success")
        else
          console.log(result.data.error)  
      }).catch(function(err){
        console.log(err)
      });

    }
  }
};
</script>

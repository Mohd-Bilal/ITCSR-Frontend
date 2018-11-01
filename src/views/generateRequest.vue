<template>
    <div style="padding-left:22%;padding-right:22%;">
    <h1 style="padding-left:20%;">Submit a Request</h1>
     <div style="padding-left:22%;padding-right:22%;">
         <span>Project : </span>
         <select @click="fetchAllProjectsUnderPI" v-model="project_name"  >
  <option disabled value="">Please select one</option>
  <option  v-for="project in projectsUnderPI" :key="project.project_id" >{{project.name}}</option>
</select>
     </div>
    </div>
</template>

<script>
var PI,projectsUnderPI,projectID,selected_project,project_name;
export default {
    data() {
    return {
      PI,
      projectsUnderPI,
      projectID,
      project_name,
      selected_project
    }
    },
    methods:{
        fetchAllProjectsUnderPI(){
            this.PI = 1;
            var self = this;
            const url = "http://localhost:3000/proposal/getAllProjectsUnderPI";
             window
            .axios({ url: url, method: "POST" ,data:{"PI_ID":self.PI}})
            .then(function(result) {
                self.projectsUnderPI = result.data.Status;
            
            console.log(result.data.Status);
            
            })
            .catch(function(err) {
            console.log(error);
            });
            },
        selectHeadUnderProject(){
            
            var self = this;
            self.projectID = 1;
            const url = "http://localhost:3000/headsUnderProject/getAll";
             window
            .axios({ url: url, method: "POST" ,data:{"project_id":self.projectID}})
            .then(function(result) {
            self.headsUnderProject = result.data.Status;
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            console.log(result);
            modal.style.display = "block";
            console.log(result.data.Status);
            window.onclick = function(event) {
                if (event.target == modal) {
                modal.style.display = "none";
                }
            };
            })
            .catch(function(err) {
            console.log(error);
            });
            },
        selectedPI(id, name) {
            document.getElementById("btn").innerHTML = "Change Project";
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
            var projectName = document.getElementById("projectName");
            projectName.innerHTML = name;
            projectName.style.visibility = "visible";
            this.projectID = id;
        },
       
    }
}
</script>

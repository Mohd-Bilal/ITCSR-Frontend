<template>
<div id="central">
<logout/>
  <button @click="routeMakeRequest" id="btnMR" v-if="privilege ==='Principal Investigator' ">
  Make Request
  </button>
  <button @click="routeCreateProposal" id="btnMR" v-if="privilege ==='Clerk' " >
    Create Proposal
  </button>
  
  <h1>Requests</h1>
  <hr>
  <!-- <ul class="requests">
    <li v-for="request in request_list" :key="request.request_id" >
      reqID:{{request.request_id}} projID:{{request.name}}
      headID:{{request.head_id}} date:{{request.date}}
      approval level:{{request.approval_level}}
      estimated amount :{{request.estimated_amount}}
    </li>
  </ul> -->
   <table >
  <tr>
    <th>Project Name</th>
    <th>Head</th>
    <th>Date</th>
    <th>Approval Level</th>
    <th>Estimated Amount</th>
       
  </tr>
  <tr v-for="request in request_list" :key="request.request_id" >
    <td>{{request.name}}</td>
    <td>{{request.head_id}}</td>
    <td>{{request.date}}</td>
    <td>{{request.approval_level}}</td>
    <td>{{request.estimated_amount}}</td>
    <td><button id="btnViewReq" @click="viewRequest(request.request_id)">View Request</button></td>
  </tr>
</table> 
</div>
</template>

<style>
#btnMR{
  position: absolute;
  left: 10%;
  top:23%;
  width:100px;
  height: 40px;
}

#btnMR a{
  text-decoration: none;
  color:black;
}
table{
  margin-top:3vh;
  width:90%;

}
th{
  font-size: 18px;
}

tr{
  text-align: center;
}
#btnViewReq{
  width:110px;
  height:4vh;
}
/* #dropdownDiv{
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
} */
.requests{
  padding-left:8vw;
  text-align: left;
}

.requests li{
  font-size:20px;
}

#central {
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 4%;
  margin: 0 auto;
}
</style>
<script>
import logout from '../components/logout_btn.vue'

var person_id,request_list=[],privilege;
export default {
  data() {
    return {
      person_id:1,
      request_list,
      privilege
    };
  },
  created:function(){
    this.privilege = this.$store.state.privilege
     var self = this;
     var req = {}
     req.person_id = this.$store.state.user_id;
      const url = "http://localhost:3000/request/getAllUnderPI";
      window
        .axios({ url: url, method: "POST",data:req })
        .then(function(result) {
          console.log("result:");
          console.log(result);
          self.request_list = result.data.status;
          console.log(result.data.status);
        })
        .catch(function(err) {

    });
  },components:{
    logout
  },
  methods: {
    routeMakeRequest(){
      this.$router.push('/makeRequest')
    },
    routeCreateProposal(){
      this.$router.push('/createProposal')
    },
    fetchAllRequests() {
      // Get the modal
      var self = this;
      const url = "http://localhost:3000/request/getAll";
      window
        .axios({ url: url, method: "POST" })
        .then(function(result) {
          console.log("result:");
          console.log(result);
          self.request_list = result.data.Status;
          
        })
        .catch(function(err) {

    });
    },
    viewRequest(request_id){
      var self = this;
      console.log(request_id);
      console.log("done")
      self.$store.commit('setRequestID',request_id);
      console.log(self.$store.state.request_id)
      this.$router.push("/viewRequest");
       
    }
    
  }
};
</script>


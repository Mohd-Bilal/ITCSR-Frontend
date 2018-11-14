<template>
<div id="central">
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
    
  </tr>
</table> 
</div>
</template>

<style>
table{
  margin-top:5vh;
  width:90%;
}
th{
  font-size: 18px;
}

tr{
  text-align: center;
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
  padding-top: 5%;
  margin: 0 auto;
}
</style>
<script>
var person_id,request_list=[];
export default {
  data() {
    return {
      person_id:1,
      request_list
    };
  },
  created:function(){
     var self = this;
      const url = "http://localhost:3000/request/getAll";
      window
        .axios({ url: url, method: "POST" })
        .then(function(result) {
          console.log("result:");
          console.log(result);
          self.request_list = result.data.status;
          console.log(result.data.status);
        })
        .catch(function(err) {

    });
  },
  methods: {

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
    }
    
  }
};
</script>


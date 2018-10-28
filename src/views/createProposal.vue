<template>
   <div style="margin-top:10vh;">
     <h1 style="padding-left:20%;">Create Proposal</h1>
     <div style="padding-left:22%;padding-right:22%;">
        <h3>Project name</h3>
        <input type="text" name="firstname"><br><br>
        <p>Date of approval :</p> <input type="date" name="Date of approval"><br><br>
        <hr>
        <div class="piDiv">
            <p style="display:inline-block;">Principal Investigator : </p>
            <button id="btn" @click="test" style="
            margin-left:2vw;
            width:8vw;height:4vh;
            display:inline-block;
            "
            >Select PI</button><br><br>
        </div>
        <p style="margin-top:0px;">Project description :</p>
        <textarea rows="7" cols="50">Project about...</textarea><br><br>
        <hr>
        
        <div>
          <p>I hereby state that the above data is valid.</p><button style="
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
      <span @click="spanFunc" class="close">&times;</span>
      <h2>Principal Investigators list</h2><hr>
    </div>
    <div class="modal-body">
      <p>Some text in the Modal Body</p>
      <p>Some other text...</p>
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
  background-color: white ;
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
export default {
  
  mounted() {
    console.log(document.getElementById("btn"));
  },
  methods: {
    test() {
      // Get the modal
      var modal = document.getElementById("myModal");

      // // Get the button that opens the modal
      // // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // // When the user clicks the button, open the modal
      // btn.onclick = function() {
        modal.style.display = "block";
      // };

      // When the user clicks on <span> (x), close the modal
      

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
    spanFunc(){
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];      
      modal.style.display = "none";
    }
  }
};
</script>
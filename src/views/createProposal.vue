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
            <button id="button" style="margin-left:2vw;width:8vw;height:4vh;display:inline-block;" @click="fetchPI">Select PI</button><br><br>
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

    </div>
</template>
<script>
var PI;
const btn = document.getElementById("button")

export default {
    data(){
        return{
            PI,btn
        }
    },
    methods:{
        fetchPI:function(){
            const url = "http://localhost:3000/proposal/getAllPI"
            window.axios({url:url,method:"POST"})
            .then(function(result){
                console.log(result)
                this.PI = result
            }).catch(function(err){
                this.PI = "Error"                
            })
        }
    }    
}
</script>

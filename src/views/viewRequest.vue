<template>
    <div style="margin-top:30px">
        <div class="main">
            <span>File No : </span>
            <span>{{file_no}}</span>
        </div>
        <br>
        <div class="main">
            <span>Project : </span>
            <span>{{project_name}}</span>
        </div>
        <br>
        <div class="main">
            <span>Principal Investigator : </span>
            <span>{{pi_name}}</span>
        </div>
        <br>
        <hr style="width:50%">
        <p id="heading">About request</p>
        <div class="sub">
            <span>Head : </span>
            <span>{{head_name}}</span>
        </div>
        <div v-for="param in parameters" v-bind:key="param.parameter_id" class="sub">
            <span>{{param.parameter_name}} -  </span>
            <span>{{param.parameter_value}}</span>
        </div>
        <div class="sub">
            <span>Total Estimate : </span>
            <span>{{amount_request}}</span>
        </div>
        <br><br>
        <button class="btn" style="margin-left:40%">APPROVE</button>
        <button class="btn" style="margin-left:5%">REJECT</button>
    </div>
</template>

<style>
.main{
    font-size: 1.5em;
    text-align: left;
    margin-left: 40%;
    line-height: 50%;

}
.sub{
    font-size: 1.25em;
    margin-left:40%;
}
#heading{
    text-align: center;
    font-size: 1.3em;
}
.btn{
    /* margin-left:45%; */
    display: inline-block;
    border-radius: 3px;
    /* width: 40px; */
    /* width:20vw; */
    clear: both;
    text-align: center;
}
</style>


<script>

var file_no,pi_name,project_name,head_name,parameters=[],amount_request,project_id,head_id,pi_id;

export default {
    data(){
        return{
            file_no,
            pi_name,
            project_name,
            head_name,
            parameters:[],
            amount_request
        }
    },
    methods:{
        callMe(){
            var self = this;
            const request_options={};
            const request_id = this.$store.state.request_id;
            request_options.request_id=request_id;
            const url = "http://localhost:3000/request/getRequest";
            window.axios({ url: url, method: "POST",data:request_options })
            .then(res=>{
                console.log("Ithu pwolikkum")
                //console.log(res)
                const request = res.data.status[0];
                console.log(request);
                console.log(request.description)
                self.parameters = request.description.parameter;
                project_id = request.project_id;
                self.amount_request = request.estimated_amount;
                head_id = request.head_id
                console.log(self.amount_request)
                const url = "http://localhost:3000/proposal/findByID"
                return window
                .axios({url:url,method:"POST",data:{project_id:project_id}})
            })
            .then(result=>{
                console.log(result);
                console.log("Keriyallo")
                console.log(result.data.Status[0].name)
                // response = new Object();----->ithentha engane ``/
                // response = result.data.Status[0]
                // console.log(response.name)
                
                self.file_no = result.data.Status[0].file_no;
                self.project_name = result.data.Status[0].name;
                pi_id = result.data.Status[0].principal_investigator_id;
                // // console.log(this.project_name)
                const url = "http://localhost:3000/people/findByID"
                return window
                .axios({url:url,method:"POST",data:{people_id:pi_id}})
            })
            .then(re=>{
                console.log("Keri");
                self.pi_name = re.data.Status[0].name;
               // console.log(re)
                const url = "http://localhost:3000/heads/getMultipleHeads"
                return window
                .axios({url:url,method:"POST",data:{head_ids:[head_id]}})
            })
            .then(ans=>{
                console.log("keruuuu")
                console.log(ans.data.Status[0].name)
                self.head_name = ans.data.Status[0].name;
            })
            .catch(err=>{
                console.log("Sheriyayilla")
            })
        }
    },
    created: function(){
        this.callMe()
    }
}
</script>

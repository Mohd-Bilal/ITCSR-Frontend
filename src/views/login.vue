<template>
    <div>
    <div class="form">
      <h1>Login</h1>
    <label>Username</label><br>
    <input v-model="username" type="text"><br>
    <label>Password</label><br>
    <input v-model="password" type="password"><br>

    <button @click="requestLogin" >Submit</button>
        
    </div>
    </div>
</template>
<style>
.form {
  padding-top: 10%;
  padding-left: 20%;
}
</style>
<script>
var username, password;
export default {
  data() {
    return {
      username,
      password
    };
  },

  methods: {
    validate() {
      return true; //for now
    },
    requestLogin: function() {
      var self = this;

      if (this.validate()) {
        var request = {};
        request.username = this.username;
        request.password = this.password;

        window
          .axios({
            url: "http://localhost:3000/authentication/login",
            method: "POST",
            data: request
          })
          .then(function(result) {
            console.log(result)
            if (result.data.success) {
              console.log("Successfully logged token" + JSON.stringify(result));
              self.$router.push("/addHead");
            } else console.log(result.data.error);
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        alert("fill'em up!");
      }
    }
  }
};
</script>
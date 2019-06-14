<template>
   <div class="login container">
      <form @submit.prevent="loginFn" class="card-panel">
         <h2 class="center deep-purple-text">Login</h2>

         <div class="input-field">
            <label for="email">Enter email</label>
            <input type="email" name="email" v-model="email">
         </div>
         <div class="input-field">
            <label for="password">Enter password</label>
            <input type="password" name="password" v-model="password">
         </div>

         <p class="red-text center" v-if="feedback">{{feedback}}</p>
         <div class="field center">
            <button class="btn deep-purple">Login</button>
         </div>
      </form>
   </div>
</template>

<script>
import firebase from "firebase";
export default {
   name: "Login",
   data() {
      return {
         email: null,
         password: null,
         feedback: null
      };
   },
   methods: {
      loginFn() {
         firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(cred => {
               console.log(cred.user.email);

               this.$router.push({ name: "gmap" });
            })
            .catch(err => {
               this.feedback = err.message;
            });
      }
   }
};
</script>

<style>
.login {
   max-width: 400px;
   margin-top: 60px;
}
h2 {
   font-size: 2.4em;
}
.card-action {
   padding-bottom: 0 !important;
}
.input-field {
   margin-bottom: 16px;
}
label {
   font-size: 12px !important;
}
</style>

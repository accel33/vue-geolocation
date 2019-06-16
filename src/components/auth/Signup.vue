<template>
   <div class="signup row">
      <form @submit.prevent="signup" class="card-panel">
         <h2 class="center deep-purple-text">Signup</h2>
         <div class="input-field">
            <label for="email">Enter email</label>
            <input type="email" name="email" v-model="email">
         </div>
         <div class="input-field">
            <label for="password">Enter password</label>
            <input type="password" name="password" v-model="password">
         </div>
         <div class="input-field">
            <label for="alias">Enter alias</label>
            <input type="text" name="alias" v-model="alias">
         </div>
         <p class="red-text center" v-if="feedback">{{feedback}}</p>
         <div class="input-field center">
            <button class="btn deep-purple waves-effect waves-dar">Signup</button>
         </div>
      </form>
   </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";
import functions from "firebase/functions";
export default {
   name: "Signup",
   data() {
      return {
         email: null,
         password: null,
         alias: null,
         feedback: null,
         slug: null
      };
   },
   methods: {
      signup() {
         if ((this.email, this.password, this.alias)) {
            this.slug = slugify(this.alias, {
               replacement: "-",
               remove: /[$*_+~.()'"!\-:@]/g,
               lower: true
            });

            // let ref = db.collection("users").doc(this.slug);
            let checkAlias = firebase
               .functions()
               .httpsCallable("checkUserAlias");
            checkAlias({ slug: this.slug }).then(result => {
               console.log(result);

               // code that was workung without firebase function
               if (!result.data.unique) {
                  this.feedback = "This alias already exists";
               } else {
                  firebase
                     .auth()
                     .createUserWithEmailAndPassword(this.email, this.password)
                     .then(cred => {
                        db.collection("users")
                           .doc(this.slug)
                           .set({
                              alias: this.alias,
                              geolocation: null,
                              user_id: cred.user.uid
                           });
                     })
                     .then(() => {
                        this.$router.push({ name: "gmap" });
                     })
                     .catch(err => {
                        console.log(err);
                        this.feedback = err.message;
                     });
                  this.feedback = "This alias is free to use";
               }
            });
         } else {
            this.feedback = "You must enter all fields";
         }
      }
   }
};
</script>

<style scoped>
.signup {
   max-width: 400px;
   margin-top: 60px;
}
h2 {
   font-size: 2.4em;
}
.input-field {
   margin-bottom: 16px;
}
label {
   font-size: 12px !important;
}
</style>

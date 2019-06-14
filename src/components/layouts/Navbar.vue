<template>
   <div class="navbar">
      <nav class="deep-purple darken-1">
         <div class="container">
            <router-link :to="{ name: 'gmap' }">GeoVue</router-link>
            <ul class="right">
               <li v-if="!user">
                  <router-link :to="{ name: 'signup' }">Signup</router-link>
               </li>
               <li v-if="!user">
                  <router-link :to="{ name: 'login' }">Login</router-link>
               </li>
               <li v-if="user"><a @click="logout">Logout</a></li>
            </ul>
         </div>
      </nav>
   </div>
</template>

<script>
import firebase from "firebase";
export default {
   name: "Navbar",
   data() {
      return {
         user: null
      };
   },
   methods: {
      logout() {
         // asynchronous
         firebase
            .auth()
            .signOut()
            .then(() => {
               this.$router.push({ name: "login" });
            });
      }
   },
   created() {
      // let user = firebase.auth().currentUser
      firebase.auth().onAuthStateChanged(user => {
         if (user) {
            this.user = user;
         } else {
            this.user = null;
         }
      });
   }
};
</script>

<style>
</style>

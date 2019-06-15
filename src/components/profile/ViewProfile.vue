<template>
   <div class="view-profile container">
      <div class="card" v-if="profile">
         <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
         <ul class="comments collection">
            <li>Comment</li>
         </ul>
         <form @submit.prevent="addcomment" class="card-panel">
            <label for="comment">Write a post</label>
            <input type="text" id="comment" v-model="comment">
         </form>
      </div>
   </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";
export default {
   name: "ViewProfile",
   data() {
      return {
         profile: null,
         comment: null,
         feedback: null,
         user: null
      };
   },
   created() {
      let ref = db.collection("users");

      // Get current user
      ref.where("user_id", "==", firebase.auth().currentUser.uid)
         .get()
         .then(dataSnapshot => {
            dataSnapshot.forEach(doc => {
               (this.user = doc.data()), (this.user.id = doc.id);
            });
         });

      ref.doc(this.$route.params.id)
         .get()
         .then(user => {
            this.profile = user.data();
         });
   },
   methods: {
      addcomment() {
         if (this.comment) {
            this.feedback = null;
            db.collection("comments")
               .add({
                  to: this.$route.params.id,
                  from: this.user.id,
                  content: this.comment,
                  time: Date.now()
               })
               .then(() => {
                  this.comment = null;
               });
         } else {
            this.feedback = "You must enter a comment to add it";
         }
      }
   }
};
</script>

<style>
</style>

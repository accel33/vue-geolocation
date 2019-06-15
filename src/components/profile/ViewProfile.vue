<template>
   <div class="view-profile container">
      <div class="card" v-if="profile">
         <h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
         <ul class="comments collection">
            <li v-for="(c,i) in comments" :key="i">
               <div class="deep-purple-text">{{c.from}}</div>
               <div class="grey-text text-darken=2">{{c.content}}</div>
            </li>
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
         user: null,
         comments: []
      };
   },
   watch: {
      $route(to, from) {
         // react to route changes...
         this.profile = null;
         this.comment = null;
         this.feedback = null;
         this.user = null;
         this.comments = [];
         let ref = db.collection("users");
         ref.where("user_id", "==", firebase.auth().currentUser.uid)
            .get()
            .then(dataSnapshot => {
               dataSnapshot.forEach(doc => {
                  (this.user = doc.data()), (this.user.id = doc.id);
               });
            });

         // Profile data
         ref.doc(this.$route.params.id)
            .get()
            .then(user => {
               this.profile = user.data();
            });
         db.collection("comments")
            .where("to", "==", this.$route.params.id)
            .onSnapshot(snapshot => {
               snapshot.docChanges().forEach(change => {
                  if (change.type == "added") {
                     this.comments.unshift({
                        from: change.doc.data().from,
                        content: change.doc.data().content
                     });
                  }
               });
            });
      }
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

      // Profile data
      ref.doc(this.$route.params.id)
         .get()
         .then(user => {
            this.profile = user.data();
         });

      // Comments
      db.collection("comments")
         .where("to", "==", this.$route.params.id)
         .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
               if (change.type == "added") {
                  this.comments.unshift({
                     from: change.doc.data().from,
                     content: change.doc.data().content
                  });
               }
            });
         });
   },
   methods: {
      addcomment() {
         if (this.comment) {
            this.feedback = null;
            db.collection("comments")
               .add({
                  to: this.$route.params.id,
                  from: this.user.alias,
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

<style scoped>
.card {
   padding: 20px;
   margin-top: 60px;
}
h2 {
   font-size: 2em;
   margin-top: 0;
}
li {
   padding: 10px;
   border-bottom: 1px solid #eee;
}
</style>

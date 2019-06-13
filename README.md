# vue-geolocation

## Project setup
```
vue create vue-geolocation
```

## Structure

- Root Component will have Navbar directly nested inside. This Navbar component will always be visible.
- '/', on the address bar will tell the Vue Router to go to our Map.vue  component.
- Map.vue is responsible for displaying the google map API, and all of the different users doted around that map and their geolocation. When clicking in one of those Users is going to redirect to '/profile/:slug' of that User and with that the Router will display the Profile.vue component.
- Profile.vue will show the Users comments and all the different messages that other people have send them.
- Signup.vue '/signup' to sign up as a new user.
- Login.vue '/login' to load up the login view.
- Route Guard is going to be implemented on the components Map.vue and Profile.vue. Only people with authentication can navigate to this routes.
- Firebase Auth will handle the signup and login components.
- Firestore database is going to be required to handle the data on each User (Geolocation and messages history).

<template>
  <h1>Create Account</h1>
  <input type="email" v-model="email" />
  <input type="password" v-model="password" />
  <button @click="signInWithGoogle">Sign In With Google</button>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signInWithGoogle: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          alert("Signed In!");
        });
    },
  },
};
</script>

<style>
</style>
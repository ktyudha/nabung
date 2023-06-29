<template>
  <h1>Create Account</h1>
  <input type="email" v-model="email" />
  <input type="password" v-model="password" />
  <button @click="register">Register</button>
  <button @click="signInWithGoogle">Sign In With Google</button>
</template>
    
  <script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const auth = getAuth();

const register = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered" + data);
      console.log(auth.currentUser);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "User not found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Wrong password";
          break;
        default:
          errMsg.value = "Unknown error";
          break;
      }
    });
};

const signInWithGoogle = () => {
  
};
</script>
    
    <style>
</style>
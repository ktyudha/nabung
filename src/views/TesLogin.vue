<template>
  <div class="container">
    <div class="col-sm-6 mt-5 p-5 col-md-4">
      <p class="fs-1 fw-bold mb-0">Login</p>
      <p class="mt-0 fs-6">Welcome back to Nabung</p>

      <div class="card mt-4">
        <div class="m-3">
          <!-- <div class="mb-3">
            <label class="form-label" for="Email">Email</label>
            <input type="text" class="form-control" v-model="email" />
          </div>
          <div class="mb-3">
            <label class="form-label" for="Password">Password</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="mb-3">
            <button @click="register" class="btn btn-danger w-100">
              Register
            </button>
          </div> -->

          <img
            src="btngoogle.png"
            class="img-fluid w-100 rounded border-0"
            @click="signInWithGoogle"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
// import { ref } from "vue";
import {
  getAuth,
  // createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

// const email = ref("");
// const password = ref("");
const router = useRouter();
// const auth = getAuth();

// const register = () => {
//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log("Successfully registered" + data);
//       router.push("/");
//     })
//     .catch((error) => {
//       console.log(error.code);
//       alert(error.message);
//     });
// };

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
    });
};
</script>
  
  <style>
</style>
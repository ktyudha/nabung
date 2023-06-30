<template>
  <div class="container">
    <!-- <div class="col-sm-6 mt-5 p-5 col-md-4">
      <p class="fs-1 fw-bold mb-0">Login</p>
      <p class="mt-0 fs-6">Welcome back to Nabung</p> -->

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
    <!-- </div> -->
    <div class="position-relative vh-100">
      <div class="position-absolute top-50 start-50 translate-middle">
        <div class="text-center align-bottom">
          <img src="logonabung.png" style="width: 50px" class="mb-4" />
        </div>

        <button
          @click="signInWithGoogle"
          class="tosca btn text-white rounded-pill"
        >
          <!-- <img
            src="google.png"
            class="rounded border-0 me-2"
            style="width: 25px"
          /> -->
          <span class="text-sm-start"> Sign In With Google</span>
        </button>
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
#app .tosca {
  /* color: #6acacd; */
  background-color: #6acacd;
}
</style>
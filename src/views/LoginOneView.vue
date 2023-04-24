<template >
  <div class="bg-primary"></div>
  <div class="container">
    <div class="col-sm-6 mt-5 p-5 col-md-4">
      <p class="fs-1 fw-bold mb-0">Login</p>
      <p class="mt-0 fs-6">Welcome back to Nabung</p>
      <form @submit.prevent="login()">
        <div class="card mt-4">
          <div class="m-3">
            <div class="mb-3">
              <label class="form-label" for="Email">Email</label>
              <input
                type="text"
                class="form-control"
                v-model="dataLogin.email"
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="Password">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="dataLogin.password"
              />
            </div>
            <div class="mb-3">
              <button class="btn btn-dark w-100">Continue</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const dataLogin = reactive({
      email: "",
      password: "",
    });

    const router = useRouter();

    function login() {
      console.log(dataLogin);
      axios
        .post("auth/login", dataLogin)
        .then((response) => {
          // console.log(dataLogin);
          // localStorage.setItem("token");
          if (response.data) {
            //set token
            localStorage.setItem("token", response.data);
            router.push({
              name: "nabung.history",
            });

            //redirect ke halaman dashboard
            // return router.push({
            //   name: "dashboard",
            // });
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
    return {
      dataLogin,
      router,
      login,
    };
  },
};
</script>
 
  <style>
</style>
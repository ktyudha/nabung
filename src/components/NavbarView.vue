import { getAuth } from 'firebase/auth';
<template>
  <nav class="navbar navbar-expand-lg bg-white">
    <div class="container">
      <a class="navbar-brand" href="/"
        ><img v-bind:src="image" class="w-50 rounded-circle" alt="user"
      /></a>
      <div class="dropdown">
        <button
          class="btn tosca text-white rounded-pill btn-sm text-capitalize fw-semibold dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ name }}
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" @click.prevent="logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script >
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "NavbarView",
  setup() {
    const auth = getAuth();
    const router = useRouter();
    const image = auth.currentUser.photoURL;
    const name = auth.currentUser.displayName;
    // console.log(image);

    const logout = () => {
      auth.signOut();
      router.push("/login");
    };
    return { auth, logout, image, name };
  },
};
</script>

<style>
#app .tosca {
  /* color: #6acacd; */
  background-color: #6acacd;
}
</style>
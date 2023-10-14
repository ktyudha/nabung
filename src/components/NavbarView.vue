import { getAuth } from 'firebase/auth';
<template>
  <nav class="navbar navbar-expand-lg bg-white">
    <div v-if="currentPath == '/'" class="container">
      <a class="navbar-brand" href="/"
        ><img
          v-bind:src="image"
          class="rounded-circle"
          alt="user"
          style="width: 30px"
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

    <div v-else class="container mt-1">
      <a class="navbar-brand fs-6 fw-semibold te-tosca" href="/">
        <font-awesome-icon :icon="['fas', 'chevron-left']" /> Pocket</a
      >

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
  computed: {
    currentURL() {
      return window.location.href;
    },
    currentPath() {
      return window.location.pathname;
    },
  },
  setup() {
    const auth = getAuth();
    const router = useRouter();
    const image = auth.currentUser.photoURL;
    const name = auth.currentUser.displayName;

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
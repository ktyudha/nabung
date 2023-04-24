<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <!-- <img src="home.png" class="navbar-brand" alt="" /> -->
      <a class="navbar-brand" href="/"> Nabung</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav fw-semibold ms-auto">
          <li class="nav-item mx-auto">
            <!-- <a class="nav-link" aria-current="page" href="/">Home</a> -->
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item mx-auto">
            <router-link class="nav-link" to="/history">History</router-link>
            <!-- <a class="nav-link" href="/history">History</a> -->
          </li>
          <li class="nav-item mx-auto">
            <!-- <a href="/login" class="btn btn-danger me-2 btn-sm">Login</a> -->

            <a
              class="nav-link text-danger text-decoration-none"
              @click="logout()"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script >
export default {
  name: "NavbarView",
  methods: {
    logout() {
      const message = "apakah anda yakin keluar?";
      if (confirm(message) == true) {
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
</style>
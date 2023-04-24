<template>
  <div>
    <NavbarView />
    <slot />
  </div>
</template>

<script>
import NavbarView from "@/components/NavbarView.vue";
export default {
  name: "AuthenticatedLayout",
  components: {
    NavbarView,
  },
};
</script>

<style>
</style>
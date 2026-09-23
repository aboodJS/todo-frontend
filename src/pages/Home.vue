<script setup lang="ts">
import NavBar from "../components/NavBar.vue";

const isLoggedIn = localStorage.getItem("jwt") ? true : false;
</script>

<template>
  <NavBar></NavBar>
  <main class="h-screen grid bg-[#f6f5f2]">
    <p class="self-center justify-self-center" v-if="isLoggedIn === false">
      please login to view your tasks
    </p>
    <section v-else></section>
  </main>
</template>

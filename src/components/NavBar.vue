<script setup>
const isLoggedIn = localStorage.getItem("token") ? true : false;
</script>

<template>
  <nav
    class="flex h-[10vh] w-screen items-center justify-between fixed top-0 text-white bg-black text-2xl"
  >
    <h3 class="font-extrabold px-3">notes</h3>
    <div v-if="isLoggedIn === false" class="flex px-3 gap-3">
      <RouterLink to="/login"><p class="hover:underline">login</p></RouterLink>
      <RouterLink to="/signup"
        ><p class="hover:underline">signup</p></RouterLink
      >
    </div>
    <div v-else>
      <button>Signout</button>
    </div>
  </nav>
</template>

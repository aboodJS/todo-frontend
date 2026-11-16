<script setup>
const isLoggedIn = localStorage.getItem("jwt") ? true : false;

function signout() {
  localStorage.removeItem("jwt");
  location.reload();
}
</script>

<template>
  <nav
    class="flex h-[10vh] w-screen z-10 items-center justify-between sticky top-0 text-white px-3"
    style="background: var(--color-ink)"
  >
    <h3 class="font-extrabold text-2xl">notes</h3>
    <div v-if="isLoggedIn === false" class="flex gap-3 text-lg">
      <RouterLink to="/login"><p class="hover:underline">login</p></RouterLink>
      <RouterLink to="/signup"><p class="hover:underline">signup</p></RouterLink>
    </div>
    <div v-else>
      <button class="text-lg hover:underline" @click="signout">Signout</button>
    </div>
  </nav>
</template>

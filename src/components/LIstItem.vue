<script setup>
const props = defineProps(["title", "description"]);
</script>

<template>
  <div class="h-20 border p-2 rounded-md">
    <h2 class="font-bold text-2xl">{{ props.title }}</h2>
    <p>{{ props.description }}</p>
  </div>
</template>

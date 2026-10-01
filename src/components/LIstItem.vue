<script setup>
const props = defineProps(["title", "description"]);
</script>

<template>
  <div class="h-20 flex border justify-between p-2 items-center rounded-md">
    <div>
      <h2 class="font-bold text-2xl">{{ props.title }}</h2>
      <p>{{ props.description }}</p>
    </div>
    <div class="w-12 text-2xl">
      <slot></slot>
    </div>
  </div>
</template>

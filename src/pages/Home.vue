<script setup lang="ts">
import { useTemplateRef } from "vue";
import NavBar from "../components/NavBar.vue";
const dialog = useTemplateRef("taskAddDialog");

async function sendTask() {
  const request = await fetch("http://localhost:3000/todos", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ msg: "hello world" }),
  })
    .then((j) => j.json())
    .then((d) => d)
    .catch((err) => err);
  console.log(request);
}

const isLoggedIn = localStorage.getItem("jwt") !== null ? true : false;
</script>

<template>
  <NavBar></NavBar>
  <main class="h-screen grid bg-[#f6f5f2]">
    <p class="self-center justify-self-center" v-if="isLoggedIn === false">
      please login to view your tasks
    </p>
    <section class="grid justify-center content-center" v-else>
      <button
        class="bg-[#2f6f4f] text-white rounded-md py-3 px-3"
        @click="() => dialog?.showModal()"
      >
        add task
      </button>
      <dialog class="left-1/3 top-1/3" ref="taskAddDialog">
        <div
          class="grid justify-center text-center p-4 bg-[#f6f5f2] h-[45vh] w-[33vw] rounded-md"
        >
          <h1 class="text-2xl font-bold">add a task</h1>
          <label for="title">enter task title</label>
          <input name="title" class="h-10 justify-self-center" type="text" />
          <input
            type="submit"
            value="add task"
            class="bg-[#2f6f4f] h-10 justify-self-center text-white rounded-md py-3 px-3"
          />
          <button @click="() => dialog?.close()">cancel</button>
        </div>
      </dialog>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useTemplateRef, ref, onBeforeMount, computed } from "vue";
import NavBar from "../components/NavBar.vue";
import LIstItem from "../components/LIstItem.vue";

const dialog = useTemplateRef("taskAddDialog");
const title = useTemplateRef("title");
const desc = useTemplateRef("desc");

const isLoggedIn = localStorage.getItem("jwt") !== null ? true : false;

const todos = ref([]);

const loadStatus = ref("idle");
const isError = ref(false);
const errorValue = ref(null);

async function grabTasks() {
  if (isLoggedIn) {
    loadStatus.value = "loading";
    isError.value = false;
    errorValue.value = null;
    try {
      const request = await fetch("http://localhost:3000/todos", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authentication: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!request.ok) {
        throw new Error(`Error: server responded with: ${request.status}`);
      }

      const data = await request.json();
      todos.value = data.todos;
      loadStatus.value = "done";
    } catch (error) {
      isError.value = true;
      errorValue.value = error.message;
    }
  }
}

const deleteLoading = ref("idle");

async function deleteTask(id) {
  deleteLoading.value = "loading";
  isError.value = false;
  errorValue.value = null;
  try {
    const res = await fetch("http://localhost:3000/delete_todo", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        taskId: id,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error: server responded with: ${res.status}`);
    }

    await grabTasks();
    deleteLoading.value = "done";
  } catch (error) {
    isError.value = true;
    errorValue.value = error.message;
  }
}

async function sendTask() {
  const request = await fetch("http://localhost:3000/todos", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      taskTitle: title.value?.value,
      taskDescription: desc.value?.value,
    }),
  })
    .then((j) => j.json())
    .then((d) => d)
    .catch((err) => err);
  console.log(request);
  location.reload();
}

onBeforeMount(async () => {
  await grabTasks();
});
</script>

<template>
  <NavBar></NavBar>
  <main class="h-screen grid bg-[#f6f5f2]">
    <p class="self-center justify-self-center" v-if="isLoggedIn === false">
      please login to view your tasks
    </p>
    <section class="grid relative content-start" v-else>
      <p
        v-if="loadStatus === 'loading' || deleteLoading === 'loading'"
        class="self-center justify-self-center"
      >
        loading...
      </p>
      <p class="self-center justify-self-center" v-if="isError === true">
        {{ errorValue }}
      </p>
      <section
        v-if="
          loadStatus === 'done' ||
          (deleteLoading === 'done' && isError === false)
        "
        class="grid max-md:grid-cols-1 grid-cols-2 w-screen gap-3 row-auto"
      >
        <LIstItem
          v-for="task in todos"
          :id="task.id"
          :title="task.title"
          :description="task.description"
        >
          <svg
            @click="deleteTask(task.id)"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
            />
          </svg>
        </LIstItem>
      </section>
      <button
        class="bg-[#2f6f4f] z-10 fixed top-[90%] left-3 text-white rounded-md py-3 px-3"
        @click="() => dialog?.showModal()"
      >
        add task
      </button>
      <dialog
        class="left-1/3 top-1/3 max-md:top-1/5 max-md:left-1/6"
        ref="taskAddDialog"
      >
        <div
          class="grid justify-center text-center p-4 bg-[#f6f5f2] h-[45vh] w-[33vw] max-md:w-[66vw] max-md:h-[55vh] rounded-md"
        >
          <h1 class="text-2xl font-bold">add a task</h1>
          <label for="title">enter task title</label>
          <input
            ref="title"
            name="title"
            class="h-10 justify-self-center max-md:w-[50vw]"
            type="text"
          />
          <label for="description">enter task title</label>
          <textarea
            ref="desc"
            name="description"
            class="h-10 justify-self-center max-md:w-[50vw] max-md:h-28"
            type="text"
          />
          <button @click="sendTask">send task</button>
          <button
            @click="
              async () => {
                console.log(await grabTasks());
                dialog?.close();
              }
            "
          >
            cancel
          </button>
        </div>
      </dialog>
    </section>
  </main>
</template>

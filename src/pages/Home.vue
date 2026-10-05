<script setup lang="ts">
import { onMounted, useTemplateRef, ref, onBeforeMount } from "vue";
import NavBar from "../components/NavBar.vue";
import LIstItem from "../components/LIstItem.vue";

const dialog = useTemplateRef("taskAddDialog");
const title = useTemplateRef("title");
const desc = useTemplateRef("desc");
const editDialog = useTemplateRef("taskEditDialog");
const newTitle = useTemplateRef("newTitle");
const newDesc = useTemplateRef("newDesc");

const isLoggedIn = localStorage.getItem("jwt") !== null ? true : false;

const todos = ref([]);

async function grabTasks() {
  if (isLoggedIn) {
    const request = await fetch("http://localhost:3000/todos", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((j) => j.json())
      .then((d) => d)
      .catch((err) => err);
    console.log(request);
    todos.value = request.todos;
  } else {
    return 0;
  }
}

async function deleteTask(id) {
  await fetch("http://localhost:3000/delete_todo", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      taskId: id,
    }),
  })
    .then((d) => d.json())
    .then((d) => d)
    .catch((err) => console.log(err));
  location.reload();
}

async function editTask(id) {
  await fetch("http://localhost:3000/edit_todo", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      taskId: id,
      taskTitle: newTitle.value,
      taskDescription: newDesc.value,
    }),
  })
    .then((d) => d.json())
    .then((d) => console.log(d))
    .catch((err) => console.log(err));
  location.reload();
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
  console.log(todos.value);
});
</script>

<template>
  <NavBar></NavBar>
  <main class="h-screen grid bg-[#f6f5f2]">
    <p class="self-center justify-self-center" v-if="isLoggedIn === false">
      please login to view your tasks
    </p>
    <section class="grid relative content-start" v-else>
      <section class="grid grid-cols-2 w-screen gap-3 row-auto">
        <LIstItem
          v-for="task in todos"
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
          <dialog class="left-1/3 top-1/3" ref="taskEditDialog">
            <div
              class="grid justify-center text-center p-4 bg-[#f6f5f2] h-[45vh] w-[33vw] rounded-md"
            >
              <h1 class="text-2xl font-bold">add a task</h1>
              <label for="title">enter task title</label>
              <input
                ref="newTitle"
                name="title"
                class="h-10 justify-self-center"
                type="text"
              />
              <label for="description">enter task title</label>
              <textarea
                ref="newDesc"
                name="description"
                class="h-10 justify-self-center"
                type="text"
              />
              <button
                @click="
                  async () => {
                    await editTask(task.id);
                  }
                "
              >
                send task
              </button>
              <button
                @click="
                  async () => {
                    editDialog?.forEach((e) => {
                      e.close();
                    });
                  }
                "
              >
                cancel
              </button>
            </div>
          </dialog>
          <svg
            @click="
              () => {
                editDialog?.forEach((e) => {
                  e.showModal();
                });
              }
            "
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
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
      <dialog class="left-1/3 top-1/3" ref="taskAddDialog">
        <div
          class="grid justify-center text-center p-4 bg-[#f6f5f2] h-[45vh] w-[33vw] rounded-md"
        >
          <h1 class="text-2xl font-bold">add a task</h1>
          <label for="title">enter task title</label>
          <input
            ref="title"
            name="title"
            class="h-10 justify-self-center"
            type="text"
          />
          <label for="description">enter task title</label>
          <textarea
            ref="desc"
            name="description"
            class="h-10 justify-self-center"
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

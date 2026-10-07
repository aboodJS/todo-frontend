<script setup>
const props = defineProps(["title", "description", "id"]);
import { useTemplateRef } from "vue";
console.log(props.id);

const newTitle = useTemplateRef("title");
const newDescription = useTemplateRef("desc");
const dialog = useTemplateRef("dialog");
async function sendTaskData() {
  const requestData = {
    taskId: props.id,
    taskTitle: newTitle.value.value,
    taskDesc: newDescription.value.value,
  };

  try {
    const response = await fetch("http://localhost:3000/edit_todo", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Success:", result);
    location.reload();
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
}
</script>

<template>
  <div class="h-20 flex border justify-between p-2 items-center rounded-md">
    <div>
      <h2 class="font-bold text-2xl">{{ props.title }}</h2>
      <p>{{ props.description }}</p>
    </div>
    <div class="w-12 text-2xl">
      <slot></slot>
      <svg
        @click="dialog.showModal()"
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
      <dialog class="left-1/3 top-1/3" ref="dialog">
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
          <button
            @click="
              async () => {
                await sendTaskData();
              }
            "
          >
            send task
          </button>
          <button @click="dialog.close()">cancel</button>
        </div>
      </dialog>
    </div>
  </div>
</template>

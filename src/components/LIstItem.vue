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
  <div class="card h-20 flex justify-between p-3 items-center">
    <div>
      <h2 class="font-bold text-xl">{{ props.title }}</h2>
      <p class="text-muted">{{ props.description }}</p>
    </div>
    <div class="flex items-center gap-2">
      <slot></slot>
      <svg
        @click="dialog.showModal()"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        class="cursor-pointer"
      >
        <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
        <path
          fill="currentColor"
          d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
        />
      </svg>
      <dialog class="app-dialog left-1/3 top-1/4 max-md:top-1/5 max-md:left-1/6" ref="dialog">
        <div class="dialog-panel h-[57vh] w-[33vw] max-md:w-[66vw] max-md:h-[55vh]">
          <h1 class="text-2xl font-bold">edit this task</h1>
          <label class="form-label" for="title">NEW TASK TITLE</label>
          <input
            ref="title"
            name="title"
            class="form-input h-10 justify-self-center max-md:w-[50vw]"
            type="text"
            :value="props.title"
          />
          <label class="form-label" for="description">NEW TASK DESCRIPTION</label>
          <textarea
            ref="desc"
            name="description"
            class="form-input h-38 justify-self-center max-md:w-[50vw] max-md:h-28"
            type="text"
            :value="props.description"
          />
          <button class="btn-primary" @click="sendTaskData()">send task</button>
          <button class="btn-secondary" @click="dialog.close()">cancel</button>
        </div>
      </dialog>
    </div>
  </div>
</template>

<script setup>
import { useTemplateRef, ref, computed } from "vue";
import { router } from "../routes";

const name = useTemplateRef("username");
const pass = useTemplateRef("password");

const status = ref("idle");
const errorMessage = ref(null);

const isLoading = computed(() => status.value === "loading");
const isDone = computed(
  () => status.value === "success" || status.value === "error",
);
async function sendLoginData() {
  status.value = "loading";
  errorMessage.value = null;

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name.value.value,
        passwd: pass.value.value,
      }),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    let data = await res.json();

    if (typeof data === "string") data = JSON.parse(data);

    if (!data.loggedin) {
      throw new Error("Invalid username or password");
    }

    localStorage.setItem("jwt", data.token);
    status.value = "success";
    await router.push("/");
  } catch (err) {
    status.value = "error";
    errorMessage.value = err.message;
  }
}
</script>

<template>
  <main class="flex max-md:grid">
    <p
      class="absolute top-4 left-1/2 bg-green-600 rounded-md p-4 text-white"
      v-if="isLoading"
    >
      loading...
    </p>
    <section
      class="md:w-2/5 max-md:h-[40vh] h-screen grid content-evenly justify-center text-white bg-[#17161a]"
    >
      <div class="grid">
        <h1 class="font-extrabold text-3xl w-3/4 justify-self-center">
          Your tasks, exactly where you left them.
        </h1>
        <p class="text-[#fff9] w-3/4 justify-self-center">
          Sign in to pick up your saved list — everything stays in one place,
          ordered by what matters next.
        </p>
      </div>
    </section>
    <section
      class="md:w-3/5 md:h-screen max-md:h-[60vh] grid content-evenly justify-center bg-[#f6f5f2]"
    >
      <div class="grid md:h-72 gap-6 content-evenly">
        <div class="grid">
          <h3 class="text-lg font-bold">Sign in</h3>
          <p class="text-[#79756d]">Welcome back. Let’s see what’s open.</p>
        </div>
        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="username"
            >USERNAME</label
          >
          <input
            ref="username"
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="text"
            name="username"
          />
        </div>
        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="passwd"
            >PASSWORD</label
          >
          <input
            ref="password"
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="password"
            name="passwd"
            id=""
            result
          />
        </div>
        <button
          @click.prevent="sendLoginData"
          class="bg-[#2f6f4f] text-white rounded-md py-3"
        >
          log in
        </button>
        <p class="text-center">
          don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
        </p>
      </div>
    </section>
  </main>
</template>

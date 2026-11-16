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
      throw new Error(`invalid username or password, please try again`);
    }

    let data = await res.json();

    if (typeof data === "string") data = JSON.parse(data);

    localStorage.setItem("jwt", data.token);
    status.value = "success";
    await router.push("/");
  } catch (err) {
    console.log(err);
    status.value = "error";
    errorMessage.value = err.message;
  }
}
</script>

<template>
  <main class="page-split">
    <p class="toast toast-error" v-if="isDone && status === 'error'">
      {{ errorMessage }}
    </p>
    <p class="toast toast-success" v-if="isLoading">loading...</p>
    <p
      @click="() => router.back()"
      class="text-white self-start absolute p-3 text-2xl cursor-pointer hover:underline"
    >
      back
    </p>
    <section
      class="panel-dark md:w-2/5 max-md:h-[40vh] h-screen grid content-evenly justify-center"
    >
      <div class="grid">
        <h1 class="font-extrabold text-3xl w-3/4 justify-self-center">
          Your tasks, exactly where you left them.
        </h1>
        <p
          class="w-3/4 justify-self-center"
          style="color: var(--color-hero-subtle)"
        >
          Sign in to pick up your saved list — everything stays in one place,
          ordered by what matters next.
        </p>
      </div>
    </section>
    <section
      class="panel-light md:w-3/5 md:h-screen max-md:h-[60vh] grid content-evenly justify-center"
    >
      <div class="grid md:h-72 gap-6 content-evenly">
        <div class="grid">
          <h3 class="text-lg font-bold">Sign in</h3>
          <p class="text-muted">Welcome back. Let’s see what’s open.</p>
        </div>
        <div class="grid">
          <label class="form-label" for="username">USERNAME</label>
          <input
            required
            ref="username"
            class="form-input"
            type="text"
            name="username"
          />
        </div>
        <div class="grid">
          <label class="form-label" for="passwd">PASSWORD</label>
          <input
            required
            ref="password"
            class="form-input"
            type="password"
            name="passwd"
            id=""
            result
          />
        </div>
        <button @click.prevent="sendLoginData" class="btn-primary">
          log in
        </button>
        <p class="text-center">
          don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { router } from "../routes";

const isError = ref(false);
const errorValue = ref(null);
const isLoading = ref(false);

async function submitForm(e) {
  isError.value = false;
  errorValue.value = null;
  isLoading.value = true;
  const formData = new FormData(e.target);
  try {
    const res = fetch("http://localhost:3000/signup", {
      method: "POST",
      body: new URLSearchParams(formData),
    });

    if (formData.get("confirmPasswd") !== formData.get("passwd")) {
      throw new Error("passwords dont match!");
    }
    formData.delete("confirmPasswd");

    if (!(await res).ok) {
      if ((await res).status === 409) {
        throw new Error("the username or email is already used");
      } else {
        throw new Error("something went wrong!");
      }
    }

    router.push("/");
  } catch (error) {
    isError.value = true;
    errorValue.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="page-split">
    <p class="toast toast-error" v-if="isLoading === false && isError === true">
      {{ errorValue }}
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
      class="panel-light md:w-3/5 max-md:h-[60vh] h-screen grid content-evenly justify-center"
    >
      <form
        @submit.prevent="submitForm"
        class="grid md:h-72 max-md:gap-3 md:gap-6 content-evenly"
      >
        <div class="grid">
          <h3 class="text-lg font-bold">Sign up</h3>
          <p class="text-muted">Welcome back. Let’s see what’s open.</p>
        </div>
        <div class="grid">
          <label class="form-label" for="username">USERNAME</label>
          <input required class="form-input" type="text" name="username" />
        </div>
        <div class="grid">
          <label class="form-label" for="email">EMAIL</label>
          <input required class="form-input" type="email" name="email" />
        </div>
        <div class="grid">
          <label class="form-label" for="passwd">PASSWORD</label>
          <input
            required
            class="form-input"
            type="password"
            name="passwd"
            id=""
          />
        </div>

        <div class="grid">
          <label class="form-label" for="confirmPasswd">CONFIRM PASSWORD</label>
          <input
            required
            class="form-input"
            type="password"
            name="confirmPasswd"
            id=""
          />
        </div>
        <input class="btn-primary" type="submit" value="Sign up" />
        <p class="text-center">
          already have an account? <RouterLink to="/login">Sign in</RouterLink>
        </p>
      </form>
    </section>
  </main>
</template>

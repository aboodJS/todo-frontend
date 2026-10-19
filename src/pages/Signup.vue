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
  <main class="flex max-md:grid">
    <p
      class="absolute top-4 left-1/2 bg-red-600 rounded-md p-4 text-white"
      v-if="isLoading === false && isError === true"
    >
      {{ errorValue }}
    </p>
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
      class="md:w-3/5 max-md:h-[60vh] h-screen grid content-evenly justify-center bg-[#f6f5f2]"
    >
      <form
        @submit.prevent="submitForm"
        class="grid md:h-72 max-md:gap-3 md:gap-6 content-evenly"
      >
        <div class="grid">
          <h3 class="text-lg font-bold">Sign up</h3>
          <p class="text-[#79756d]">Welcome back. Let’s see what’s open.</p>
        </div>
        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="username"
            >USERNAME</label
          >
          <input
            required
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="text"
            name="username"
          />
        </div>
        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="email"
            >EMAIL</label
          >
          <input
            required
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="email"
            name="email"
          />
        </div>
        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="passwd"
            >PASSWORD</label
          >
          <input
            required
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="password"
            name="passwd"
            id=""
          />
        </div>

        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="confirmPasswd"
            >CONFIRM PASSWORD</label
          >
          <input
            required
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="password"
            name="confirmPasswd"
            id=""
          />
        </div>
        <input
          class="bg-[#2f6f4f] text-white rounded-md py-3"
          type="submit"
          value="Sign up"
        />
        <p class="text-center">
          already have an account? <RouterLink to="/login">Sign in</RouterLink>
        </p>
      </form>
    </section>
  </main>
</template>

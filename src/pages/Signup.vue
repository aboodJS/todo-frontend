<script setup></script>

<template>
  <main class="flex">
    <section
      class="w-2/5 h-screen grid content-evenly justify-center text-white bg-[#17161a]"
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
      class="w-3/5 h-screen grid content-evenly justify-center bg-[#f6f5f2]"
    >
      <form method="post" class="grid h-72 gap-6 content-evenly">
        <div class="grid">
          <h3 class="text-lg font-bold">Sign up</h3>
          <p class="text-[#79756d]">Welcome back. Let’s see what’s open.</p>
        </div>
        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="username"
            >USERNAME</label
          >
          <input
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
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="password"
            name="passwd"
            id=""
          />
        </div>

        <div class="grid">
          <label class="text-[#79756d] text-xs font-bold" for="passwd"
            >CONFIRM PASSWORD</label
          >
          <input
            class="bg-[#ffffff] p-1 border rounded-sm border-[#e5e7eb] outline-0 focus:outline-[#cad1c5]"
            type="password"
            name="passwd"
            id=""
          />
        </div>
        <input
          class="bg-[#2f6f4f] text-white rounded-md py-3"
          type="submit"
          formaction="http://localhost:3000/signup"
          value="Sign up"
        />
        <p class="text-center">
          already have an account? <RouterLink to="/">Sign in</RouterLink>
        </p>
      </form>
    </section>
  </main>
</template>

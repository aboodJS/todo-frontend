<template>
  <main class="flex max-md:grid">
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
      <form class="grid md:h-72 gap-6 content-evenly" method="POST">
        <div class="grid">
          <h3 class="text-lg font-bold">Sign in</h3>
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
        <input
          formaction="http://localhost:3000/login"
          class="bg-[#2f6f4f] text-white rounded-md py-3"
          type="submit"
          value="Sign in"
        />
        <p class="text-center">
          don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
        </p>
      </form>
    </section>
  </main>
</template>

<template>
  <div>
    <UHeader>
      <UCard>
        <Ucontainer class="flex justify-center">
          <div class="flex flex-row">
            <div class="p-5"><nuxt-link to="/">Home</nuxt-link></div>
            <div class="p-5"><nuxt-link to="/about">About</nuxt-link></div>
          </div>
          <div class="flex justify-items-end">
            <div v-if="!authenticated" class="loginBtn" style="float: right">
              <UButton> <nuxt-link to="/login">Login</nuxt-link></UButton>
            </div>
          </div>
        </Ucontainer>
      </UCard>
    </UHeader>

    <div class="mainContent">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useRouter } from "vue-router";
import { useAuthStore } from "~/store/auth"; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>

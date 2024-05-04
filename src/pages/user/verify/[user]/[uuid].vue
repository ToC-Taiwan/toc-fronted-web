<script setup lang="ts">
import { VerifyUser } from "@/apis/auth/auth";
import { i18n } from "@/i18n";
import { onMounted, ref } from "vue";

const props = defineProps({
  user: {
    type: String,
    required: true
  },
  uuid: {
    type: String,
    required: true
  }
});

const result = ref("...");

onMounted(() => {
  VerifyUser(props.user, props.uuid)
    .then(() => {
      result.value = i18n.global.tm("user_verified");
    })
    .catch((e: string) => {
      if (i18n.global.te(e)) {
        result.value = i18n.global.tm(e);
      } else {
        result.value = i18n.global.tm("user_not_verified");
      }
    });
});
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            rgba(33, 150, 243, 0.4) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
          style="border-radius: 53px"
        >
          <img
            src="@/assets/svg/logo.svg"
            alt="Sakai logo"
            class="mb-5 w-6rem flex-shrink-0"
          />
          <span class="text-blue-500 font-bold text-4xl">{{
            $t("verify_user")
          }}</span>
          <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">
            {{ result }}
          </h1>
          <router-link
            v-if="result !== '...'"
            to="/"
            class="flex align-items-center pt-5 border-300"
          >
            <span
              class="flex justify-content-center align-items-center bg-cyan-400 border-round"
              style="height: 3.5rem; width: 3.5rem"
            >
              <i class="text-50 pi pi-fw pi-home text-2xl"></i>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="json">
{
  "meta": {
    "title": "verify_user",
    "layout": "BlankLayout"
  }
}
</route>

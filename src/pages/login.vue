<script setup lang="ts">
import { Login } from "@/apis/auth/auth";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
const toast = useToast();
const router = useRouter();

const username = ref("");
const password = ref("");

const login = async () => {
  Login(username.value, password.value)
    .then((token) => {
      localStorage.setItem("token", token);
      router.push({
        path: "/"
      });
    })
    .catch(() => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Login failed",
        life: 3000
      });
    });
};
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
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <img
              src="@/assets/svg/logo.svg"
              alt="Image"
              height="150"
              class="mb-3"
            />
            <div class="text-900 text-3xl font-medium mb-3">
              {{ t("welcome") }}!
            </div>
            <span class="text-600 font-medium">{{
              t("sign_in_to_continue")
            }}</span>
          </div>

          <div>
            <label
              for="username"
              class="block text-900 text-xl font-medium mb-2"
              >{{ t("username") }}</label
            >
            <InputText
              id="username"
              v-model="username"
              type="text"
              :placeholder="t('enter_username')"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
            />

            <label
              for="password"
              class="block text-900 font-medium text-xl mb-2"
              >{{ t("password") }}</label
            >
            <InputText
              id="password"
              v-model="password"
              type="password"
              :placeholder="t('enter_password')"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
            />

            <div
              class="flex align-items-center justify-content-between mb-5 gap-5"
            >
              <div class="flex align-items-center">
                <div>
                  <LocaleDropdown />
                </div>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >{{ t("forget_password") }}?</a
              >
            </div>
            <Button
              :label="t('sign_in')"
              class="w-full p-3 text-xl"
              @click="login"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Toast />
</template>

<route lang="json">
{
  "meta": {
    "title": "page_login",
    "layout": "BlankLayout"
  }
}
</route>

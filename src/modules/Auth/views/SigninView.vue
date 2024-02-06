<template>
  <div class="signin-container">
    <header class="signin__header logo">
      <LogoIcon />
    </header>
    <main class="signin__content">
      <h1>Вход в <span>CodeFlowStudio</span></h1>
      <p>Войдите или зарегистрируйтесь, чтобы начать разрабатывать свои
        проекты уже сегодня.</p>

      <div class="content__buttons">
        <ButtonComponent :variant="Variant.Primary"
                         :size="Size.Large"
                          @click="signIn">
          <GoogleIcon />
          Войти с помощью Google
        </ButtonComponent>

<!--        <div class="buttons__row">-->
<!--          <ButtonComponent :variant="Variant.Secondary" @click="signIn">-->
<!--            <GoogleIcon />-->
<!--            Sign in with Google-->
<!--          </ButtonComponent>-->
<!--          <ButtonComponent :variant="Variant.Secondary" @click="signIn">-->
<!--            <GoogleIcon />-->
<!--            Sign in with Google-->
<!--          </ButtonComponent>-->
<!--        </div>-->
      </div>
    </main>
    <footer class="signin__footer">
      <p>
        Продолжая, вы соглашаетесь с
        <a href="">Условиями использования</a> и <br/> <a href="">Политикой
        конфиденциальности</a> CodeFlowStudio
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import {SignInData, Size, Variant} from "@/utils/types/global.types";
import LogoIcon from "@/components/Icons/LogoIcon.vue";
import {useRoute, useRouter} from "vue-router";
import {googleLogin} from "@/utils/services/auth.service";
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.store";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

onMounted(async () => {
  if (Object.keys(route.query).length > 0) {
    const data: SignInData = await googleLogin(route.query);
    auth.signIn(data);
    await router.push({name: 'recent'});
  }
})

function signIn() {
  window.location.href = "http://localhost:3000/auth/google"
}
</script>

<style lang="scss">
@import "../assets/signin.scss";
</style>

<template>
  <div class="signin-container">
    <header class="signin__header logo">
      <img width="120" height="120" src="@/assets/images/logo.svg" alt=""/>
    </header>
    <main class="signin__content">
      <h1>Sign in to <span>CodeFlowStudio</span></h1>
      <p>Login or register to start building your projects today.</p>

      <div class="content__buttons">
        <ButtonComponent :variant="Variant.Primary"
                         :size="Size.Large"
                          @click="signIn">
          <GoogleIcon />
          Sign in with GitHub
        </ButtonComponent>

        <div class="buttons__row">
          <ButtonComponent :variant="Variant.Secondary" @click="signIn">
            <GoogleIcon />
            Sign in with Google
          </ButtonComponent>
          <ButtonComponent :variant="Variant.Secondary" @click="signIn">
            <GoogleIcon />
            Sign in with Google
          </ButtonComponent>
        </div>
      </div>
    </main>
    <footer class="signin__footer">
      <p>
        By continuing, you agree to CodeFlowStudio <br/>
        <a href="">Terms of Service</a>, <a href="">Privacy Policy</a>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import { Size, Variant } from "@/utils/types/global.types";

export default {
  name: "SigninView",
  components: { ButtonComponent, GoogleIcon },

  data() {
    return {
      Size,
      Variant
    }
  },

  methods: {
    signIn() {
      return this.$router.push({ name: 'recent' });
    }
  }
}
</script>

<style lang="scss">
@import "../assets/signin.scss";
</style>

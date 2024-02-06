import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {type SignInData, type User} from "@/utils/types/global.types";
import Cookies from 'js-cookie';
import {loadCurrentUser} from "@/utils/services/auth.service";

export const useAuthStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const currentUser = computed<User | null>(() => user.value);
  const authAccess = computed<boolean>(() => user.value !== null);

  function setToken(token) {
    Cookies.set('accessToken', token);
  }

  function signIn(data: SignInData) {
    setToken(data.token);
    user.value = data.user;
  }

  async function loadUser() {
    const accessToken: string = Cookies.get('accessToken');
    user.value = await loadCurrentUser(accessToken);
  }

  return { currentUser, authAccess, signIn, loadUser }
})

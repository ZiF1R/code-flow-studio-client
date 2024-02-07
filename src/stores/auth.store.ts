import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {type SignInData, type User} from "@/utils/types/global.types";
import Cookies from 'js-cookie';
import {loadCurrentUser} from "@/utils/services/auth.service";

export const useAuthStore = defineStore('auth', () => {
  const remainUser = JSON.parse(localStorage.getItem('user'));
  const user = ref<User | null>(
    remainUser && remainUser !== 'null' ? remainUser : null
  );
  const currentUser = computed<User | null>(() => user.value);
  const authAccess = computed<boolean>(() => user.value !== null);

  function setToken(token: string): void {
    Cookies.set('accessToken', token);
  }

  function signIn(data: SignInData): void {
    setToken(data.token);
    user.value = data.user;
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  async function loadUser(): Promise<void> {
    const accessToken: string = Cookies.get('accessToken');
    user.value = await loadCurrentUser(accessToken);
    if (user.value) {
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  }

  return { currentUser, authAccess, signIn, loadUser }
})

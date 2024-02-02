import {onMounted, onUnmounted, ref} from "vue";
import {debounce} from "@/utils/helpers/helpers";

export function useCheckMobile() {
  const isMobile = ref<Boolean>(window.innerWidth < 600);

  const handler = debounce(checkMobile, 200);
  onMounted(() => {
    window.addEventListener('resize', handler);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handler);
  });

  function checkMobile() {
    isMobile.value = window.innerWidth < 600;
  }

  return { isMobile }
}

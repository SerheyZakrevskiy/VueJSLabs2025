import { onMounted, ref, watch } from "vue";

export type Theme = "light" | "dark";

const STORAGE_KEY = "lab3-theme";

const theme = ref<Theme>("light");
const isInitialized = ref(false);

function applyTheme(value: Theme) {
  document.documentElement.setAttribute("data-theme", value);
}

export function useTheme() {
  onMounted(() => {
    if (!isInitialized.value) {
      const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;

      if (savedTheme === "light" || savedTheme === "dark") {
        theme.value = savedTheme;
      }

      applyTheme(theme.value);
      isInitialized.value = true;
    }
  });

  watch(theme, (value) => {
    applyTheme(value);
    localStorage.setItem(STORAGE_KEY, value);
  });

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }

  return {
    theme,
    toggleTheme,
  };
}

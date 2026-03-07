import type { App } from "vue";

export type CopyToClipboardFn = (text: string) => Promise<boolean>;

declare module "vue" {
  interface ComponentCustomProperties {
    $copyToClipboard: CopyToClipboardFn;
  }
}

const CopyToClipboardPlugin = {
  install(app: App) {
    const copyToClipboard: CopyToClipboardFn = async (text: string) => {
      try {
        await navigator.clipboard.writeText(String(text));
        return true;
      } catch {
        return false;
      }
    };

    app.config.globalProperties.$copyToClipboard = copyToClipboard;
    app.provide("copyToClipboard", copyToClipboard);
  },
};

export default CopyToClipboardPlugin;

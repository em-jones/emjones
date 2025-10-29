declare module "*.mdx";

declare global {
  declare module "solid-js" {
    namespace JSX {
      interface IntrinsicElements {
        "el-dialog": any;
        "el-dialog-backdrop": any;
        "el-dialog-panel": any;
      }
    }
  }
}

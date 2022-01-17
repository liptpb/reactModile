declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module 'postcss-px-to-viewport';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  globalConfig: any;
}

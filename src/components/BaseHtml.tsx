import * as elements from "typed-html";

type Children =
  | number
  | string
  | Promise<string>
  | boolean
  | null
  | undefined
  | Children[];


type PropsWithChildren<T = {}> = {
  children?: Children;
  styles?: Children;
} & T;
type BaseHtmlProps = {
} & PropsWithChildren


export default function ({ children }: BaseHtmlProps) {
  return (
    <html lang="en">
      <head>
        <title>My App🦊</title>
        <link rel="stylesheet" href="/public/dist/unocss.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css" />
      </head>
      <body>
        <div class="flex justify-center pt-10 bg-zinc-900 min-h-screen text-sm" >
          {children}
        </div>
      </body>
    </html>
  );
}
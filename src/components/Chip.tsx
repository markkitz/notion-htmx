import type { Color } from "../schema/dataTable";

export default function Chip({ color, text, onclick }: { color: Color, text: string, onclick?:string}) {
    if(onclick){
        return (
          <span class={`inline-flex items-center gap-x-0.5 rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset ${selectColors[color].default}`}>
            {text}
            <button type="button" class={`group relative -mr-1 h-3.5 w-3.5 rounded-sm ${selectColors[color].btnHover}`}
              onclick={onclick}
            >
              <span class="sr-only">Remove</span>
              <svg viewBox="0 0 14 14" class={`h-3.5 w-3.5 ${selectColors[color].icon}`}>
                <path d="M4 4l6 6m0-6l-6 6" />
              </svg>
              <span class="absolute -inset-1"></span>
            </button>
          </span>)
      }
    return (<span class={`inline-flex items-center gap-x-0.5 rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset ${selectColors[color].default}`}>
        {text}
    </span>)
}
export const selectColors: { [key in Color]: { default: string, btnHover: string, icon: string } } = {
    yellow: { default: "bg-yellow-400/10 text-yellow-500 ring-yellow-400/20", btnHover: "hover:bg-yellow-500/10", icon: "stroke-yellow-400/50 group-hover:stroke-yellow-100/75" },
    green: { default: "bg-green-500/10 text-green-400 ring-green-500/20", btnHover: "hover:bg-green-500/10", icon: "stroke-green-400/50 group-hover:stroke-green-100/75" },
    blue: { default: "bg-blue-400/10 text-blue-400 ring-blue-400/30", btnHover: "hover:bg-blue-500/10", icon: "stroke-blue-400/50 group-hover:stroke-blue-100/75" },
    gray: { default: "bg-gray-400/10 text-gray-400 ring-gray-400/20", btnHover: "hover:bg-gray-500/10", icon: "stroke-gray-400/50 group-hover:stroke-gray-100/75" },
    pink: { default: "bg-pink-400/10 text-pink-400 ring-pink-400/20", btnHover: "hover:bg-pink-500/10", icon: "stroke-pink-400/50 group-hover:stroke-pink-100/75" },
    orange: { default: "bg-orange-400/10 text-orange-400 ring-orange-400/20", btnHover: "hover:bg-orange-500/10", icon: "stroke-orange-400/50 group-hover:stroke-orange-100/75" },
    purple: { default: "bg-purple-400/10 text-purple-400 ring-purple-400/20", btnHover: "hover:bg-purple-500/10", icon: "stroke-purple-400/50 group-hover:stroke-purple-100/75" },
    red: { default: "bg-red-400/10 text-red-400 ring-red-400/20", btnHover: "hover:bg-red-500/10", icon: "stroke-red-400/50 group-hover:stroke-red-100/75" },
  };
export function AddItemRow({tableId}: {tableId: string}) {
    return (
        <div
            hx-post={`/table/${tableId}/row`}
            hx-swap="beforeend"
            hx-target="#rowsForm"
            class="flex items-center border-t-stone-700 border-t-1 h-8 text-white/30 h-8 hover:bg-stone-800 hover:opacity-80 cursor-pointer ml-6">
            <div class="i-mdi-add text-lg " />
            <div class="leading-tight text-sm ml-1">New</div>
        </div>
    )
}
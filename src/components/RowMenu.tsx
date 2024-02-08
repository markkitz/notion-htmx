
export default function RowMenu({ rowId, tableId, isOpen = false }: { rowId: string, tableId: string, isOpen?: boolean }) {
    if (isOpen) {
        return (<div class={`row-menu-open relative  pl-1 block w-6 flex items-center  h-8`}
            id="row-menu-open"
        >
            <div class="i-mdi-drag text-lg drag-handle"></div>
            <RowMenuContent rowId={rowId} tableId={tableId} />
        </div>)
    }
    return (
        <div class={`row-drag-menu  pl-1 block w-6 flex items-center  h-8`}
            hx-get={`/table/${tableId}/${rowId}/row-menu`}
            hx-swap="outerHTML"

        >
            <div class="i-mdi-drag text-lg drag-handle"></div>
        </div>)
}


function RowMenuContent({ rowId, tableId }: { rowId: string, tableId: string }) {
    return (<>
        <div
            id="modal-backstop"
            class="fixed inset-0  z-50"
            hx-delete={`/table/${tableId}/${rowId}/row-menu`}
            hx-swap="outerHTML"
            hx-target="#row-menu-open"
        ></div>

        <div class="absolute left-8 top-0 w-[225px]  origin-top-right z-60 bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md p-1 pb-2">
            <RowMenuContextItem text="Delete" icon="i-mdi-trash"
                hx-delete={`/table/${tableId}/${rowId}`}
                hx-swap="outerHTML"
                _={`on click remove #row-${rowId}`}

            />
            <RowMenuContextItem
                text="Duplicate"
                icon="i-mdi-content-copy"
                hx-post={`/table/${tableId}/${rowId}/duplicate`}
                hx-swap="outerHTML"
                hx-target={`#row-${rowId}`}
            />
            <hr class="border-stone-700 mt-2 mb-2" />
            <div class="text-stone-400  text-xs px-2 py-1">Edited by Joe Smith</div>
            <div class="text-stone-400  text-xs px-2">Yesterday at 11:22 AM MST</div>       
         </div>

    </>)
}



type RowMenuContextItemProps = {
    text: string;
    icon: string;
} & JSX.IntrinsicElements['div'];

function RowMenuContextItem({ text, icon, ...props }: RowMenuContextItemProps) {
    return (
        <div
            class="block px-2 py-1 text-stone-400 hover:bg-stone-700 flex items-center gap-2 rounded-sm cursor-pointer"
            role="menuItem"
            {...props}
        >
            <div class={icon}></div>
            <div>{text}</div>
        </div>
    );
}
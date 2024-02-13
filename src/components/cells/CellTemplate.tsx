import type { CellData, Column } from "../../schema/dataTable";

export default function CellTemplate(props: {  column: Column, rowId: string, noPadding?: boolean, children: JSX.Element | string, id?: string }) {
    const { column, children, noPadding, id, ...attrib } = props;
    return (
        <div
            tabindex={0}
            id={id}
            data-column={column.id}
            class={`h-full  flex items-center  text-stone-300   border-t-stone-700 border-t-1 border-r-stone-700 border-r-1 relative ${noPadding ? '' : 'px-2'}`}
            style={{ width: `${column.width}px` }}
            {...attrib}
        >
            {children}
            <div class="i-mdi-loading htmx-indicator text-indigo-600  h-5 w-5 animate-spin absolute right-3" />
        </div>
    );
}
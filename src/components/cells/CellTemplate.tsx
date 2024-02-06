import type { Column } from "../../schema/dataTable";

export default function CellTemplate(props: { column: Column, children: any }) {
    const { column, children, ...attrib } = props;   

    return (<div
        class="h-full  flex items-center  text-stone-300   border-t-stone-700 border-t-1 relative"
        style={{ width: `${column.width}px` }} {...attrib} >
        {children}
        <div class="i-mdi-loading htmx-indicator text-indigo-600  h-5 w-5 animate-spin absolute right-3" />
    </div>);
}
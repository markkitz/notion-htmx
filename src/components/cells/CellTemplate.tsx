import type { Column } from "../../schema/dataTable";

export default function CellTemplate(props: { column: Column, children: JSX.Element | string[],  noPadding?: boolean, id?:string } ) {
    const { column, children, noPadding,  ...attrib } = props;  
    
    return (<div
        tabindex="0"
        id={attrib.id}  
        
        
        class={`h-full  flex items-center  text-stone-300 border-r-stone-700 border-r-1 border-t-stone-700 border-t-1 relative ${noPadding ? '' : 'px-2'}`}
        style={{ width: `${column.width}px` }} {...attrib} 
        
        >
        {children}
        
        <div  class="i-mdi-loading htmx-indicator text-indigo-600  h-5 w-5 animate-spin absolute right-3 z-10" />
    </div>);
}
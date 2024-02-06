import type { Column } from "../schema/dataTable";

export function TableHeader({columns}: {columns: Column[]}) {
    return (<div
          class="flex relative h-8  text-stone-400">
          
          {columns.map((column, n) => {
              return (
                  <div style={{width: `${column.width}px`}}>
                      {column.title}                    
                  </div>
              )
          })} 
          <div class="flex-1 pl-2"></div>
    </div>);
}
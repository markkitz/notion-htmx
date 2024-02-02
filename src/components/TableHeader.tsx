import type { Column } from "../schema/dataTable";

export function TableHeader({columns}: {columns: Column[]}) {
    return (<div
          class="flex relative h-8  text-stone-400">
          
          {columns.map((column, n) => {
              const isLast = n == columns.length - 1;
              return (
                  <div style={{width: `${column.width}px`}}>
                      {column.title}                    
                  </div>
              )
          })} 
    </div>);
}
import type {  Color, Column } from "../../schema/dataTable";
import Chip from "../Chip";
import CellTemplate from "./CellTemplate";

export default function CellSelect({  column, rowId, option }: {  column: Column, rowId: string, option: {text:string, color:Color}  }) {

    return (<CellTemplate
        column={column}
        rowId={rowId}
        noPadding
        hx-get={`/table/${column.tableId}/${rowId}/${column.id}/edit`}
        hx-swap="outerHTML"
        hx-trigger="click, keyup[keyCode==13]"
    >
       <Chip color={option.color} text={option.text} />


    </CellTemplate>)
}
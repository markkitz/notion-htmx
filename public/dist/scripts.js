htmx.onLoad(function(content) {
    var sortables = content.querySelectorAll(".sortable");
    
    for (var i = 0; i < sortables.length; i++) {
      var sortable = sortables[i];
      const tableId = sortable.getAttribute("data-tableId");
      var sortableInstance = new Sortable(sortable, {
          animation: 150,
          ghostClass: 'row-being-dragged',
          handle: ".drag-handle",        


          onEnd: function (evt) {     
            document.getElementById(`hdn-rowsort-${tableId}`).click();

          }
      });


      sortable.addEventListener("htmx:afterSwap", function() {
        sortableInstance.option("disabled", false);
      });
    }
})
function getAllChildrenIds(parentId) {
    let parent = document.getElementById(parentId);
    let children = parent.children;
    let ids = [];
    for (let i = 0; i < children.length; i++) {
        ids.push(children[i].getAttribute('data-row-id'));
    }
    return ids;
}

/////////////////////////

function getColumnData(tableId) {
    const parentElement = document.getElementById(`th-${tableId}`);
    let _columnData = []
    for (let i = 0; i < parentElement.children.length; i++) {
        const child = parentElement.children[i];
        const [id, width, x] = [child.getAttribute('id'), parseInt(child.style.width.replace("px", "")), getXTranslation(child.style.transform)];
        _columnData.push({ id, width, x });
    }
  
    _columnData.sort((a, b) => a.x - b.x);
    return _columnData;
  }
  
  function resizeColumn(columnId, tableId,  width) {
    document.querySelectorAll(`div[data-column='${columnId}']`).forEach((div) => {
        div.style.width = `${width}px`;
    });
    const _columnData = getColumnData(tableId);
    let x = 0;
    // reset the x position of each column
    for (let i = 0; i < _columnData.length; i++) {
        const c = _columnData[i];
        c.x = x;
        x += c.width;
        let div = document.getElementById(c.id);
        div.style = getStyle(c.x, c.width);
    }
  
  }



const MIN_COLUMN_WIDTH = 50;

function expanderMouseDown(e, columnId, tableId) {
  e.stopPropagation();
  e.preventDefault();
  const startingX = e.clientX;
  const column = document.querySelector(`#${columnId}`);
  const childDiv = column.querySelector('div');
  childDiv.classList.add('bg-blue-500');
  const startingWidthInt = parseInt(column.getAttribute('data-column-width'));
  
  document.onmousemove = e2 => {
        const width = startingWidthInt + e2.clientX - startingX;
        resizeColumn(columnId, tableId,  width < MIN_COLUMN_WIDTH ? MIN_COLUMN_WIDTH : width)
    };
  document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      childDiv.classList.remove('bg-blue-500');
      column.setAttribute('data-column-width', parseInt(column.style.width.replace('px', '')));
      document.getElementById(`hdn-columns-${tableId}`).click();
  }
}

function getXTranslation(translateXValue) {
  // Extract the numerical part using a regular expression
  const match = translateXValue.match(/translateX\(([-\d.]+)px\)/);
  // Check if there's a match and return the numerical value
  return match ? parseInt(match[1]) : null;
}
function getStyle(x, width, doTransition = false) {
  const transform = `transform: translateX(${x}px);`;
  const widthStyle = width ? `width:${width}px;` : "";
  const transition = doTransition
      ? `transition-property: width, height, left,  transform; transition-duration: 270ms; transition-timing-function: ease`
      : "";
  return [widthStyle, transform, transition].join("");
}
/////////////////////////////////////////////

function columnMouseDown(e) {  
    let parentElement = e.target.parentElement;
    const tableId = parentElement.getAttribute("data-tableId");
    let _columnData = []
    for (let i = 0; i < parentElement.children.length; i++) {
        const child = parentElement.children[i];      
        const [id, width, x] = [child.getAttribute('id'), parseInt(child.style.width.replace("px", "")), getXTranslation(child.style.transform)];
        _columnData.push({ id, width, x });
    }
    _columnData.sort((a, b) => a.x - b.x);
    let _columnIndex = _columnData.findIndex((x) => x.id === e.target.getAttribute("id"));
    let _columnMoving = e.target;
    let _headerLeftBounds = e.target.parentElement.getBoundingClientRect().left;
    let _columnOffset = e.offsetX;
  
    function handleMouseMove(e) {
        if (!_columnMoving) {
            return;
        }
        const colTranslateX = Math.round(e.clientX - _columnOffset - _headerLeftBounds);
        let mousePositionOnTrack = e.clientX - _headerLeftBounds;
  
        let rightXTrigger =
            _columnIndex < _columnData.length - 1 ? _columnData[_columnIndex + 1].x : null;
        let leftXTrigger = _columnIndex > 0 ? _columnData[_columnIndex - 1].x + _columnData[_columnIndex - 1].width : null;
  
        if (colTranslateX < 0) {
            _columnMoving.style.transform = `translateX(0px)`;
            return;
        }
        if (!rightXTrigger && colTranslateX > _columnData[_columnIndex].x) {
            _columnMoving.style.transform = `translateX(${_columnData[_columnIndex].x}px)`;
            return;
        }
        if (
            !!rightXTrigger &&
            mousePositionOnTrack > rightXTrigger
        ) {
            moveColumn("right");
            return;
        }
        else if (
            !!leftXTrigger &&
            mousePositionOnTrack < leftXTrigger
        ) {
            moveColumn("left");
  
        }
        _columnMoving.style.transform = `translateX(${colTranslateX}px)`;
  
    }
    function handleMouseUp() {
      
        // Remove listeners on mouse up
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
  
        _columnMoving = null;
        for (let i = 0; i < _columnData.length; i++) {
            const c = _columnData[i];
            const div = document.getElementById(c.id);
            div.style = getStyle(c.x, c.width);
        }
        document.getElementById(`hdn-columns-${tableId}`).click();
    }
    function moveColumn(direction) {
        const swapColumns = (index1, index2) => {
            const temp = _columnData[index1];
            _columnData[index1] = _columnData[index2];
            _columnData[index2] = temp;
        };
  
        if (direction === "right" && _columnIndex < _columnData.length - 1) {
            swapColumns(_columnIndex, _columnIndex + 1);
            _columnIndex++;
        } else if (direction === "left" && _columnIndex > 0) {
            swapColumns(_columnIndex, _columnIndex - 1);
            _columnIndex--;
        } else {
            // Handle invalid direction or column index
            return;
        }
  
        let stopX = 0;
        _columnData.forEach((column) => {
            column.x = stopX;
            stopX += column.width;
        });
  
        const columnMoved = direction === "right" ? _columnData[_columnIndex - 1] : _columnData[_columnIndex + 1];
        const div = document.getElementById(columnMoved.id);
        div.style = getStyle(columnMoved.x, columnMoved.width, true);
    }
  
  
  
    // Add listeners on mouse down
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }
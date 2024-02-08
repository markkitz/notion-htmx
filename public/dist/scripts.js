htmx.onLoad(function(content) {
    var sortables = content.querySelectorAll(".sortable");
    
    for (var i = 0; i < sortables.length; i++) {
      var sortable = sortables[i];
      const tableId = sortable.getAttribute("data-tableId");
      var sortableInstance = new Sortable(sortable, {
          animation: 150,
          ghostClass: 'row-being-dragged',
          handle: ".drag-handle",        

          onStart: function (evt) {
       
          },
          onMove: function (evt) {
          },


          onEnd: function (evt) {     
            const sortableId =       `#rf-${tableId}`;
            console.log(sortableId);
           
            htmx.trigger(sortableId, `sort-${tableId}`)

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
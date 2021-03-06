function Mobile_Tables() {
  this.tablesWrapper = document.getElementsByClassName("table-wrapper");
  /* window.innerWidth will return the wrong value on Chrome since Nov 17. Replaced with window.visualViewportWidth */
  this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth || window.visualViewport.width;

  hammer_tables = null;
  
  for (i = 0; i < this.tablesWrapper.length; i++) {
    this.tablesWrapper[i].id = `table_${i}`;
    var CurRail = this.tablesWrapper[i].firstChild;
    var maxLeft = 0;
    if (this.screenWidth < CurRail.firstChild.offsetWidth) {
      this.tablesWrapper[i].classList.add("isSwipe");
      maxLeft = this.screenWidth - (CurRail.firstChild.offsetWidth) - 70; /* -70 was previously -40, but at this level it clipped the edge of the table. Not sure what changed in markup */
    }

    hammer_tables = new Hammer(this.tablesWrapper[i]);
    hammer_tables.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold:100, drag_block_vertical: true });
    if (hammer_tables != null) {
      hammer_tables.on("panleft", function (ev) {
      // Fixing an issue where it recognises vertical scrolling as panLeft
      if(Math.abs(ev.deltaY) < 100) {
        let tableToMove = false;
        let tableFound  = false;
        let checkedEl   = ev.target;

        // Keep looking for the parentElement with the right id
        // Limiting the executions avoid While loop problems:
        for ( let j = 0; j < 8; j++ ) {
          // The further into the table the user swipes, the higher it needs to go.
          if(tableFound === false) {
            if(checkedEl && checkedEl.id && checkedEl.id.includes('table_')) {
              tableToMove = checkedEl.firstChild;
              tableFound  = true;
            } else {
              // Continue looking, one element above
              checkedEl = checkedEl.parentElement;
            }
          }
        }
        if (tableToMove && !tableToMove.parentNode.classList.contains("swiped")) {
          tableToMove.parentNode.classList.add("swiped");
          tableToMove.style.left = maxLeft + "px";
        }
      }
        
    });

      hammer_tables.on("panright", function (ev) {
        // Fixing an issue where it recognises vertical scrolling as panLeft
        if(Math.abs(ev.deltaY) < 100) {
          let tableToMove = false;
          let tableFound  = false;
          let checkedEl   = ev.target;

          // Keep looking for the parentElement with the right id
          // Limiting the executions avoid While loop problems:
          for ( let j = 0; j < 8; j++ ) {
            // The further into the table the user swipes, the higher it needs to go.
            if(tableFound === false) {
              if(checkedEl && checkedEl.id && checkedEl.id.includes('table_')) {
                tableToMove = checkedEl.firstChild;
                tableFound  = true;
              } else {
                // Continue looking, one element above
                checkedEl = checkedEl.parentElement;
              }
            }
          }
          if (tableToMove && tableToMove.parentNode.classList.contains("swiped")) {
            tableToMove.parentNode.classList.remove("swiped");
            tableToMove.style.left = "0px";
          }
        }
      });
    }
  }


}
window.addEventListener("load", function(event) {
  window.mobile_tables = new Mobile_Tables();
});

## Tasks for 09/06/2025
- Tidy Up Collapsibles
    - Give them their own Custom Component rather than just being an extension of pressable container - Done
    - Nest Components within them rather than having them handled a level higher - Done
    - Use actual UTF arrows rather than keyboard > and v - Done
    - (Future TODO) Look into doing animations for open and close
- Shift Calendar and Forms into different states 
    - Selecting a date removes calendar to show forms, pressing "back to calendar" removes forms to show calendar - Done
    - Decide how to display data (if any) on the calendar view - no feasible way to display on a mobile interface, sadly

## Tasks for (12-13)/06/2025
- Tidy up the UI and fix some visual bugs - done

## Tasks for 16/06/2025
- Implement data save, load, edit and delete
    - Save first, so we have something to do the other bits to
    - Load second, so we have something to conceptualise the display around
    - Edit and Delete last - Important, but not blocking other features

## Bugs and Solutions
- Infinity height containers
    - related to flex-grow, I've removed it for now
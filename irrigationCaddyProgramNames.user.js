// ==UserScript==
// @name        irrigationCaddyProgramNames
// @namespace   irrigationCaddy
// @description Replaces Program Numbers with defined names
// @include     *
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
var programLinkIds = [
  'pgm1-link',
  'pgm2-link',
  'pgm3-link'
];
var programLinkElements = [
];
function promptForNewName(el)
{
  newName = prompt('Enter a new name for this program', el.innerHTML);
  if (newName.length > 0)
  {
    GM_setValue(el.id, newName);
    el.innerHTML = newName;
  }
}

function addRenameLinksToSprinklerCaddyWebpage()
{
  var numProgramsToRename = programLinkIds.length;
  for (var i = 0; i < numProgramsToRename; i++)
  {
    programLinkElements[i] = document.getElementById(programLinkIds[i]);
  }
  if (programLinkElements[numProgramsToRename - 1] == null)
  {
    setTimeout(addRenameLinksToSprinklerCaddyWebpage, 1000);
  } 
  else
  {
    for (var i = 0; i < numProgramsToRename; i++)
    {

      programLinkElement = programLinkElements[i];
      if (programLinkElement != null)
      {
        var editButton = document.createElement('a');
        editButton.innerHTML = '[*]';
        editButton.href = 'javascript:void(0)';
        editButton.style.fontSize = 'xx-small';
        editButton.style.cssFloat = 'right';
        programLinkElement.parentElement.appendChild(editButton);
        programLinkElement.style.display = 'inline';
        editButton.style.display = 'inline';
        editButton.style.border = '0px';
        programLinkElement.style.border = '0px';
        programLinkElement.parentElement.style.borderBottom = '1px solid white';
        editButton.onclick = function () {
          promptForNewName(this.parentElement.firstChild);
        };
        var newProgramName = GM_getValue(programLinkElement.id, programLinkElement.innerHTML);
        programLinkElement.innerHTML = newProgramName;
      }
    }
  }
}
addRenameLinksToSprinklerCaddyWebpage();

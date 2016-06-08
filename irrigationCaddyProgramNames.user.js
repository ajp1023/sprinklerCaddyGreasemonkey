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

//this function checks to see if the "Program Scheudle" div is present, and if it is
//replaces "Program n" text in the header with "Program : {customName}"

function changeProgramHeaderText()
{
  var programNumberHeading = document.getElementById('progNumber');
  if (programNumberHeading != null)
  {
    programNumber = programNumberHeading.innerHTML;
    if (false == isNaN(parseInt(programNumber)))
    {
      programLinkId = programLinkIds[parseInt(programNumber) - 1];
      var newProgramName = GM_getValue(programLinkId, programNumber);
      programNumberHeading.innerHTML = ': ' + newProgramName;
    }
  }

   setTimeout(changeProgramHeaderText, 2000);
}

//this function adds the small [#] links next to the left sidebar's program name links.
//this allows you to click on the small link to rename the Sprinkler Caddy's default names
// of "Program N" with your own name.
function addRenameLinksToSprinklerCaddyWebpage()
{
  var numProgramsToRename = programLinkIds.length;
  for (var i = 0; i < numProgramsToRename; i++)
  {
    programLinkElements[i] = document.getElementById(programLinkIds[i]);
  }
  if (programLinkElements[numProgramsToRename - 1] == null)
  {
    setTimeout(addRenameLinksToSprinklerCaddyWebpage, 3000);
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
    changeProgramHeaderText();
  }
}
addRenameLinksToSprinklerCaddyWebpage();

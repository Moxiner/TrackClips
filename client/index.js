/* 1) Create an instance of CSInterface. */
var csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
var startclips = document.querySelector("#startclips");
startclips.addEventListener("click", videoclips);
var showntick = document.querySelector("#showtick");
showntick.addEventListener("click", showtick);
/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function videoclips() {
  var inputElement = document.querySelector("#tick");
  var tick = inputElement.value;
  var switchElement = document.getElementById("trim");
  var trimState = switchElement.checked;
  var inputElement = document.querySelector("#ticksClips");
  var ticksClips = inputElement.value;
  command = "SelectVideoClips(" + tick + "," + ticksClips + "," + trimState + ")"
  console.log(command)
  csInterface.evalScript(command);
}

function showtick() {
    csInterface.evalScript("showtick()");

}

let overlay = document.querySelector(".overlay");
let input=document.querySelector("input")

function Openpalette() {
  overlay.classList.add("open"); 
  input.value=''
  input.focus()
}

function Closepalette() {
  overlay.classList.remove("open");
}

window.addEventListener("keydown", function (elem) {
  const isCorrectKey =
    (elem.metaKey || elem.ctrlKey) && (elem.key.toLowerCase() == "k");

  if (isCorrectKey) {
    elem.preventDefault(); 
    overlay.classList.contains("open") ? Closepalette() : Openpalette();
  }

  if (elem.key === "Escape") {
    Closepalette();
  }
});

overlay.addEventListener("click", function (elem) {
  if (elem.target === overlay) {
    Closepalette();
  }
});

function normaliseURL(url){
  return /^https?:\/\/ /i.test(url) ? url:'https://'+url
}

function openNewtab(url){
  window.open(url,'_blank','noopener')
}

function parseInput(str){
  var parts=str.split(' ')
  var verb=parts[0].toLowerCase()
  var args=parts.slice(1)
  return {verb:verb,args:args}
}

function runCommand(text){
  var parsed=parseInput(text)
  var verb=parsed.verb
  var args=parsed.args

  if(verb=='open' ||  verb=='o'){
    openNewtab(normaliseURL(args[0]))
  }
  
  if( verb=='youtube' || verb=='y'){
    var term=args.join(' ')
    openNewtab('https://www.youtube.com/results?search_query='+ encodeURIComponent(term))
  }
   
  if(verb=="theme" || verb=="th"){
    var mode=args[0]
    if(mode=='light'){
     document.documentElement.style.setProperty('--pri','#1c1c1c')
     document.documentElement.style.setProperty('--sec','#dedede')
     document.documentElement.style.setProperty('--lessL','#3c3c3c')
     document.documentElement.style.setProperty('--lessD','#c3c3c3')
    }
     else if(mode=='dark'){
      document.documentElement.style.setProperty('--sec','#1c1c1c')
     document.documentElement.style.setProperty('--pri','#dedede')
     document.documentElement.style.setProperty('--lessD','#3c3c3c')
     document.documentElement.style.setProperty('--lessL','#c3c3c3')
     }
     else{
      alert("wrong theme")
     }
  }

  if(verb=='google' ||  verb=='g'){
    var term=args.join(' ')
    openNewtab('https://www.google.com/search?q='+ encodeURIComponent(term))
  }
}
 input.addEventListener("keydown",function(e){
  if(e.key=='Enter'){
    runCommand(input.value)
    input.value=''
    Closepalette()
  }
 })
 let suggestionsBox = document.getElementById("suggestions");
let commands = ["open", "youtube", "theme light", "theme dark", "google"];

input.addEventListener("input", function () {
  let query = input.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  let filtered = commands.filter(cmd => cmd.startsWith(query));

  if (filtered.length > 0) {
    suggestionsBox.style.display = "block";
    filtered.forEach(cmd => {
      let li = document.createElement("li");
      li.textContent = cmd;
      li.addEventListener("click", () => {
        input.value = cmd;
        suggestionsBox.style.display = "none";
      });
      suggestionsBox.appendChild(li);
    });
  } else {
    suggestionsBox.style.display = "none";
  }
});
document.getElementById("openPaletteBtn").addEventListener("click", () => {
  openPalette();
});











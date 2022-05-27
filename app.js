


const widthForm = document.getElementById("width")
const bombForm = document.getElementById("bombs")
const updateBtn = document.getElementById('update')
const grid = document.getElementById('grid')
let width = 20
let bombs = 20
const divs = []

updateBtn.addEventListener("click",()=>{
  let w = (widthForm.value)
  let b = (bombForm.value)
  
  if(w=="" || b==""){
    alert("Fill out form")
    return
  }
  if((w*w)-b<10 || b<1 || w.indexOf('.')>=0 || b.indexOf('.')>=0){
    alert("Unable to generate board")
    return
  }
  width = w*20
  bombs = b 
  
  grid.style.width = `${width}px`
  grid.style.height= `${width}px`
  width = w
  createBoard()
})

function createBoard(){
  removeAllChildNodes(grid)
  for(let i=0;i<(width*width);i++){
    const place = document.createElement('div')
    divs.push(place)
    grid.appendChild(place)
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

const startBtn = document.getElementById("start-btn")
const widthForm = document.getElementById("width")
const bombForm = document.getElementById("bombs")
const updateBtn = document.getElementById('update')
const grid = document.getElementById('grid')
let width = 20
let bombs = 40
let cleared = 0
let divs = []
let bombsPlaced = false
let gameOver = false
let timerVariable = setInterval(countUpTimer, 1000);
const time = document.getElementById("time")
let increaseTime = false

function countUpTimer() {
  if(increaseTime){
  time.innerHTML = parseInt(time.innerHTML)+1
  }
}

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
  width = parseInt(w)
  bombs = parseInt(b)
  divs=[]
  gameOver = false
  bombsPlaced = false
  
  createBoard()
  
})

startBtn.addEventListener("click",()=>{
  divs=[]
  gameOver = false
  bombsPlaced = false
  cleared = 0
  createBoard()
  
})

function createBoard(){
  time.innerHTML = 0
  increaseTime = false
  removeAllChildNodes(grid)
  
  for(let i=0;i<(width*width);i++){
    const place = document.createElement('div')
    place.setAttribute("num", i)
    place.addEventListener("click",()=>{
      clicked(place)
    })
    place.addEventListener('contextmenu', e=>{
      e.preventDefault()
      flag(place)
    })
    divs.push(place)
    grid.appendChild(place)
  }
}

function clicked(place){
  if(gameOver){
    return
  }

  if (bombsPlaced==false){
    placeBombs(place)
    increaseTime = true
    time.innerHTML = 0
    bombsPlaced = true
    setNumbers()
  }
  if(place.innerHTML!="🚩"){
    if(place.classList.contains("bomb")){
      alert("Game Over")
      increaseTime = false
      gameOver = true
    }
    else{
      cleared = cleared+1
      if(cleared===(width*width-bombs)){
        gameOver = true
        alert("You win!")
        increaseTime = false
        return
      }
      let around = place.getAttribute("neighbors")
      
      place.innerHTML = around
      if (around=="0"){
        let hold = getNeighbors(place)
        hold.forEach(neighbor=>{
          if(neighbor.innerHTML==''){
            clicked(neighbor)
          }
          
        })
      }
    }
  }
 
 
}

function placeBombs(place){
   cache = getNeighbors(place)
   cache.add(place)
   
   for(let i=0;i<bombs;i++){
     
     let temp = divs[Math.floor(Math.random()*divs.length)]
     while(cache.has(temp)){
      temp = divs[Math.floor(Math.random()*divs.length)]
     }
     temp.classList.add("bomb")
     
     cache.add(temp)
   }
   
}

function getNeighbors(place){
  let cache = new Set()
  let num = parseInt(place.getAttribute("num"))
  
  if(num>=width){
    if((num%width)!=0){
      
      cache.add(divs[num-width-1]) 
      
    }
    
    cache.add(divs[num-width])
    
    if(((num+1)%width)!=0){
      
      cache.add(divs[num-width+1])
      
    }
  }
  if(num%width!=0){
    cache.add(divs[num-1])
    
  }
  if(((num+1)%width)!=0){
    cache.add(divs[num+1])
    
  }
  if(num<(width*width)-width){
    if(num%width!=0){
      cache.add(divs[num+width-1])
    }
    cache.add(divs[num+width])
    if(((num+1)%width)!=0){
      cache.add(divs[num+width+1])
    }
  }
  
  return cache
  

}

function flag(place){
  if(place.innerHTML=='🚩'){
    place.innerHTML='';
  }
  else if(place.innerHTML==''){
    place.innerHTML ='🚩'
  }
  
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      
      parent.removeChild(parent.firstChild);
  }
}

function setNumbers(){
  
  for(let i=0;i<divs.length;i++){
    let curr = divs[i]
    neighbors = getNeighbors(curr)
    count = 0
    
    neighbors.forEach(neighbor=>{
      if (neighbor.classList.contains("bomb")){
        count+=1
      }
    })
    curr.setAttribute("neighbors",count)

    

    
  }
}

let snek = [{x: 0, y:0}, {x: 0, y:10}, {x: 0, y:20}]
const jobbalsosarok = {x:-400, y:-400}
const h = 800
const w = 800
let alma = {
    x: 0,
    y: 0
}
let pont = 0
let kovek = []


let direction = "Up"
const canvas = document.querySelector('canvas')
const ecset = canvas.getContext('2d')
ecset.translate(canvas.width/2,canvas.height/2);
ecset.rotate(2*Math.PI)

document.addEventListener('keydown', dir)

function dir(event){
    switch (event.key) {
        case "ArrowLeft":
            direction = "Left"
            break;
    
        case "ArrowRight":
            direction = "Right"
            break;
        
        case "ArrowUp":
            direction = "Up"
            break;

        case "ArrowDown":
            direction = "Down"
            break;

        case " ":
            
            break;
    }
}

function randomBetween(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function clear(){
    ecset.beginPath()
    ecset.clearRect(jobbalsosarok.x, jobbalsosarok.y, w, h)
    ecset.closePath()
}

function drawSneak(sneak){
    sneak.forEach(element =>{
        ecset.beginPath()
        ecset.fillStyle = 'green'
        ecset.fillRect(element.x, element.y, 10, 10)
        ecset.closePath()
    })
}

function drawApple(apple){
    ecset.beginPath()
    ecset.fillStyle = 'red'
    ecset.fillRect(apple.x, apple.y, 10, 10)
    ecset.closePath()
}

function drawStones(){
    kovek.forEach(elem=>{
        ecset.beginPath()
        ecset.fillStyle = 'grey'
        ecset.fillRect(elem.x, elem.y, 10, 10)
        ecset.closePath()
    })
}

function moveSneak(dir, sneak){
    //console.log(sneak)
    for(let i = sneak.length-1; i > 0; i--){
        sneak[i].x = sneak[i-1].x
        sneak[i].y = sneak[i-1].y
    }
    switch (dir) {
        case "Up":
            sneak[0].y -= 10
            break;
    
        case "Down":
            sneak[0].y += 10
            break;

        case "Left":
            sneak[0].x -= 10
            break;

        case "Right":
            sneak[0].x += 10
            break;
    }
    //console.log(sneak)
}

function almaPut(){
    do {
        alma = {
            x: randomBetween(-w/20, (w/20)-1)*10,
            y: randomBetween(-h/20, (h/20)-1)*10
        }   
    } while (snek.includes(alma) || kovek.includes(alma));
}

function putStones(){
    for(let i = 0; i < 8; i++){
        let ko = {}
        do {
            ko = {
                x: randomBetween(-w/20, (w/20)-1)*10,
                y: randomBetween(-h/20, (h/20)-1)*10
            }
        } while (snek.includes(ko))
        kovek.push(ko)
    }
}

function benneVan(apple, sneak){
   return sneak[0].x == apple.x && sneak[0].y == apple.y
}

function checkStones(sneak){
    return kovek.some(ko => benneVan(ko, sneak))
}

function onmaga(sneak){
    for(let i = 1; i < sneak.length; i++){
        if(sneak[i].x == sneak[0].x && sneak[i].y == sneak[0].y) return true
    }
    return false
}

function gameLoop(){
    putStones()
    almaPut()
    let init = setInterval(()=>{
        if(onmaga(snek) || checkStones(snek) || snek[0].x > 400 || snek[0].x < -400 || snek[0].y > 400 || snek[0].y < -400){
            clearInterval(init)
            dialog.showModal()
        }
        clear()
        drawSneak(snek)
        moveSneak(direction, snek)
        drawApple(alma)
        drawStones()
        if(benneVan(alma, snek)){
            pont++
            almaPut()
            document.querySelector('#pont').innerHTML = pont
            snek.push({x: alma.x, y:alma.y})
        }
    } ,'75')
}

function savePlayer(player, score){
    
}

const menu = document.querySelector('#menu')
const game = document.querySelector('#game')
const ng = document.querySelector('#start')
const save = document.querySelector('#save')
const dialog = document.querySelector('dialog')
const playerInput = document.querySelector('#player')

ng.addEventListener('click', ()=>{
    menu.classList.toggle('noShow')
    game.classList.toggle('noShow')
    gameLoop()
})

save.addEventListener('click', ()=>{
    snek = [{x: 0, y:0}, {x: 0, y:10}, {x: 0, y:20}]
    pont = 0
    document.querySelector('#pont').innerHTML = pont
    kovek = []
    direction = 'Up'
    dialog.close('done')
    menu.classList.toggle('noShow')
    game.classList.toggle('noShow')
    let player = playerInput.value
    playerInput.value = 'player'
    savePlayer(player, pont)
})
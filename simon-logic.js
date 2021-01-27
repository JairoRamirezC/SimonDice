const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ejemplo = document.getElementById('example')
const LAST_LEVEL = 10

class Juego {
    constructor() {
        this.inicializar();
        setTimeout(() => {
        this.siguienteNivel()
        }, 1000)
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        btnEmpezar.classList.add("hide");
        this.level = 1
        this.colors = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    siguienteNivel(){
        this.secuencia = new Array(LAST_LEVEL).fill(0).map(number => Math.floor(Math.random()*4))
        this.subLevel = 0
        this.iluminarSecuencia()
        this.inputButton()
    }

    transformarNumeroAColor(num){
        switch (num) {
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(nom){
        switch (nom) {
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){
        for (let i = 0; i < this.level; i++) {
            const colorName = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(colorName), 1000 * i)
        }
    }

    iluminarColor(colorName){
        this.colors[colorName].classList.add('light')
        setTimeout(() => {
            this.colors[colorName].classList.remove('light')
        }, 350)
    }
    
    inputButton(){
        this.colors.celeste.addEventListener(`click`, this.elegirColor)
        this.colors.violeta.addEventListener('click', this.elegirColor)
        this.colors.naranja.addEventListener('click', this.elegirColor)
        this.colors.verde.addEventListener('click', this.elegirColor)
    }

    removeButton(){
        this.colors.celeste.removeEventListener(`click`, this.elegirColor)
        this.colors.violeta.removeEventListener('click', this.elegirColor)
        this.colors.naranja.removeEventListener('click', this.elegirColor)
        this.colors.verde.removeEventListener('click', this.elegirColor)
    }

    gameFinish(){
        this.removeButton()
        btnEmpezar.classList.remove("hide");
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subLevel]){
            this.subLevel++
            if(this.subLevel === this.level){
                this.level++
                if(this.level === (LAST_LEVEL + 1)){
                    swal('Winner', "Yor are the champion", 'success')
                        .then(() => this.gameFinish())
                }else{
                    swal('Keep going', 'Awesome, pass to the next level', 'info')
                        .then(() => setTimeout(this.siguienteNivel, 1500))
                }
            }
        }else{
            swal('You lost', 'that button is incorrect', 'error')
                .then(() => this.gameFinish())
        }
    }
}

function empezarJuego(){
    window.juego = new Juego();
}

// evento de javascript para ejecutar la funcion cuando se pasa el mouse 
// sobre el elemnto HTML con onmouseover = "wtf()"
// function wtf(){
//     console.log(`Alguien sobrepaso por aca por medio de ${event.type}`)
// }

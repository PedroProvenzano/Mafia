// Variables globales
let url = "https://busqueda-tesoro-api.herokuapp.com";
let participantes = [];

let key = prompt("Ingresa tu Key");
// Dom
const contenedorVotantes = document.getElementById("contenedorVotantes");
const inputKey = document.getElementById("keyPersonal");
const inputNombre = document.getElementById("aQuienVotar");
const botonVotar = document.getElementById("botonVotar");
const consola = document.getElementById("consola");

const anotaciones = document.getElementById("anotaciones");
const botonAnotaciones = document.getElementById("botonAnotaciones");
const parrafoAnotaciones = document.getElementById("parrafoAnotaciones");



// Eventos
botonVotar.addEventListener("click",()=>{
    let endpoint = "votar";
    let votado = inputNombre.value;
    fetch(url + "/" + endpoint + "/" + key + "/" + votado, {method: "POST"})
    .then(res => res.text())
    .then(respuesta => consola.innerText = respuesta);
})

// Funciones
function conseguirParticipantes(){
    fetch(`https://busqueda-tesoro-api.herokuapp.com/participantes/${key}`)
    .then(resultado => resultado.json())
    .then(function (partici){
        for(let indiv of partici){
            let div = document.createElement("div");
            div.id = indiv.nombre;
            let participante = {
                nombre: indiv.nombre,
                cantVotos: 0,
            }
            participantes.push(participante);
            div.className = "divParticipante";
            let p = document.createElement("p");
            p.innerText = indiv.nombre;
            p.setAttribute("style", "display:flex;flex-direction:column;justify-content:center;");
            div.appendChild(p);
            let p2 = document.createElement("p");
            p2.setAttribute("style", "display:flex;flex-direction:column;justify-content:center;");
            if(indiv.vive==true){
                p2.innerText = "Si";
            }else if(indiv.vive==false){
                p2.innerText = "RIP";
            }
            if(indiv.nombre=="DIOS"){
                p2.innerText = "Inmortal";
            }
            div.appendChild(p2);
            let p3 = document.createElement("p");
            p3.setAttribute("style", "display:flex;flex-direction:column;justify-content:center;");
            fetch(`https://busqueda-tesoro-api.herokuapp.com/aquienvoto/${key}/${indiv.nombre}`)
            .then(resultado => resultado.text())
            .then(function (voto){
                for(let part of participantes){
                            if(part.nombre==voto.slice(28).toLowerCase()){
                                part.cantVotos++
                }
            }
                if(indiv.nombre=="DIOS"){
                    p3.innerText = "Dios no vota";
                    div.appendChild(p3);
                    return;
                }
                if(voto.length==44){
                    p3.innerText = "No votó";
                }else{
                    p3.innerText = voto.slice(22);
                }
                div.appendChild(p3);
            }).then(()=>{
            let p4 = document.createElement("p");
            p4.innerText = indiv.rol;
            p4.setAttribute("style", "display:flex;flex-direction:column;justify-content:center;");
            div.appendChild(p4);})
            contenedorVotantes.appendChild(div);
        }
    });
}

conseguirParticipantes();

botonAnotaciones.addEventListener('click', saveData);



function saveData(){
    let saveData = JSON.stringify(anotaciones.value);
    localStorage.setItem("textArea", saveData);
    botonAnotaciones.innerText = "Guardado!";
    botonAnotaciones.style.backgroundColor = "rgb(126, 233, 112)";
    setTimeout(()=>{
        botonAnotaciones.innerText = "Guardar";
        botonAnotaciones.style.backgroundColor = "burlywood";    
    },2000)
}

function loadData(){
    if(localStorage.textArea){
        let loadDataAr = JSON.parse(localStorage.getItem("textArea"));
        anotaciones.value = loadDataAr;
    }
}
loadData();



// Consola Policia/Asesino/Medico

const botonPolicia = document.getElementById("botonPolicia");
const botonAsesinos = document.getElementById("botonAsesinos");
const botonMedico = document.getElementById("botonMedico");

const consolaPolicia = document.getElementById("consolaPolicia");
const consolaAsesinos = document.getElementById("consolaAsesinos");
const consolaMedico = document.getElementById("consolaMedico");


botonPolicia.addEventListener('click', ()=>{
    consolaPolicia.style.display = "flex";
    consolaAsesinos.style.display = "none";
    consolaMedico.style.display = "none";
})
botonAsesinos.addEventListener("click",()=>{
    consolaAsesinos.style.display = "flex";
    consolaPolicia.style.display = "none";
    consolaMedico.style.display = "none";
})
botonMedico.addEventListener("click", ()=>{
    consolaMedico.style.display = "flex";
    consolaPolicia.style.display = "none";
    consolaAsesinos.style.display = "none";
})

// Funcion fetch

function Policia()
{
    fetch(`https://busqueda-tesoro-api.herokuapp.com/aquienvoto/${key}/policia`)
    .then(resultado => resultado.json())
    .then(function (partici){
    
        consolaPolicia.innerText = partici.error;

    })
}
Policia();

function Asesinos(){
    fetch(`https://busqueda-tesoro-api.herokuapp.com/aquienvoto/${key}/asesines`)
    .then(resultado => resultado.json())
    .then(function (partici){
    
        consolaAsesinos.innerText = partici.error;

    })
}
Asesinos();

function Medico(){
    fetch(`https://busqueda-tesoro-api.herokuapp.com/aquienvoto/${key}/medico`)
    .then(resultado => resultado.json())
    .then(function (partici){
    
        consolaMedico.innerText = partici.error;

    })
}
Medico();
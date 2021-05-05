window.onscroll = function() {myFunction()};

let header = document.getElementById("header");
let wraperTop = document.getElementById("wraper-top");

let sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("fixed-top");
    wraperTop.classList.remove("hide");
  } else {
    header.classList.remove("fixed-top");
    wraperTop.classList.add("hide");
  }
}


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#enviar").addEventListener("click", () => {

        let url = "https://api.lyrics.ovh/v1/";
        let artista = document.querySelector("#artista").value;
        let cancion = document.querySelector("#cancion").value;
        let errorMsg = "Artista o canción no encontrada";
        url += artista + "/" + cancion;
        resetInput();
        const api = new XMLHttpRequest();
        api.open('GET', url, true);
        api.send();
        let letra = document.querySelector("#lyrics");
        letra.innerHTML = '';

        api.onreadystatechange = function () {

            if (this.status == 200 && this.readyState == 4) {
                let datos = JSON.parse(this.responseText);
                console.log(datos.lyrics);
                letra.innerHTML += `<li><h2>${cancion}</h2><h3>${artista}</h3><p>${datos.lyrics.replace(new RegExp("\n","g"),"<br>")}<p></li>`;
                show();
            } else if (this.status !== 200 && this.readyState == 4) {
                letra.innerHTML += `<li><h3>${errorMsg}</h3></li>`;
                show();
            }
        }
    });
});

function show() {
    let contenedor = document.querySelector("#lyrics-container");
    contenedor.classList.remove("hide");
}

function resetInput(){
  document.getElementById('artista').value = '';
  document.getElementById('cancion').value = '';
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector("#enviar").addEventListener("click", () => {

    let url = "https://api.lyrics.ovh/v1/";
    let artista = document.querySelector("#artista").value;
    let cancion = document.querySelector("#cancion").value;
    let errorMsg = "Artist or Song not found! Try again!";

    url += artista + "/" + cancion;
    resetInput();
    console.log(url);
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    let letra = document.querySelector("#lyrics");
    letra.innerHTML = '';

    api.onreadystatechange = function () {

      if (this.status == 200 && this.readyState == 4) {
        let datos = JSON.parse(this.responseText);
        letra.innerHTML += `<li><h2>${cancion}</h2><h3>${artista}</h3><p>${datos.lyrics.replace(new RegExp(/\r\n|\n\n|\n\n\n/gi),"<br>")}<p></li>`;
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

function resetInput() {
  document.getElementById('artista').value = '';
  document.getElementById('cancion').value = '';
}
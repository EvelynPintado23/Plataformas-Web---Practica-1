var data, overlay, popup, btnCerrarPopup, dataDetalles;

var portada = "", titulo = "", anio = "", nominal = "", duracion = "",
genero = "", estreno = "", director = "", resumen = "", pais = "",
idioma = "", actores = "", premios = "", escritores = "", Ratings="",
Metascore = "", imdbRating = "", imdbVotes = "", Type = "", DVD = "",
BoxOffice = "", Production = "", Website = "";

var numPagina = 1;
var totalResult = 0;

function listarPeliculas(){
    numPagina = 1;
    var titulo = document.getElementById("nombreMovie").value;
    document.getElementById("numPagBusc").innerHTML = " ";
    var detalles = "";
    // Validamos si existe la informacion ingresada
    if(titulo == ""){
        detalles = "<tr>" + "<td colspan='5'>Ingresar informacion...</td>" + "</tr>";
        document.getElementById("tablaDetallesPeliculas").innerHTML = detalles;
    }else{
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest ();
        }else{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText)
                console.log(Math.round((data.totalResults) / 10));
                totalResult = Math.round((data.totalResults) / 10);
                document.getElementById("totalResults").innerHTML = data.totalResults;
                if (totalResult == 0){
                    document.getElementById("totalPaginasMost").innerHTML = 1;
                    document.getElementById("totalPaginasMostPie").innerHTML = 1;
                } else {
                    document.getElementById("totalPaginasMost").innerHTML = totalResult;
                    document.getElementById("totalPaginasMostPie").innerHTML = totalResult;
                }
                desactivar();
                // busca cada pelicula y nos detalla su informacion 
                data.Search.forEach(movie =>{
                    //validamos que exista imagen de portada
                    var imagen = movie.Poster;
                    if (imagen == "N/A"){
                        imagen = "sinImagen.jpg";
                    }
                    //tomamos de la tabla de detalles el anio el titulo y el tipo con su imagen
                    detalles += "<tr>" +
                        "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fa fa-eye'></i>'</a>" +
                        "<td>" + movie.Title + "</td>" +
                        "<td>" + movie.Year + "</td>" +
                        "<td>" + movie.Type + "</td>" +
                        "<td><img src=" + imagen + "></td" +
                        "</tr>";
                });
                document.getElementById("tablaDetallesPeliculas").innerHTML = detalles;
            }
        };
        // obtenemos los datos con la API de OmdB nuestra api es = 2a0107e8
        xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=2a0107e8=" + titulo + "&plot=full", true);
        xmlhttp.send();
    }
}

function paginar(numPaginaAct) {
    var titulo = document.getElementById("nombreMovie").value;
    var detalles = "";
    desactivar();
    //con la variable numPagina controlamos la ubicacion de cada peliculaa
    console.log(numPagina);
    if (titulo == "") {
        detalles = "<tr>" +
            "<td colspan='5'>Ingresar informacion...</td>" +
            "</tr>";
        document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText)
                data.Search.forEach(movie => {
                    var imagen = movie.Poster;
                    if (imagen == "N/A") {
                        imagen = "sinImagen.jpg";
                    }
                    detalles += "<tr>" +
                        "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fa fa-eye'></i>'</a>" +
                        "<td>" + movie.Title + "</td>" +
                        "<td>" + movie.Year + "</td>" +
                        "<td>" + movie.Type + "</td>" +
                        "<td><img src=" + imagen + "></td" +
                        "</tr>";
                });
                document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
            }
        };
        xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=2a0107e8=" + titulo + "&plot=full&page=" + numPaginaAct, true);
        xmlhttp.send();
    }
}

function irPagina() {
    var numPaginaAct = document.getElementById("numPagBusc").value;
    var titulo = document.getElementById("nombreMovie").value;
    var detalles = "";
    if (numPaginaAct > totalResult) {
        detalles = "<tr>" +
            "<td colspan='5'>Numero de pagina fuera de limite..</td>" +
            "</tr>";
        document.getElementById("tablaDetallesPeliculas").innerHTML = detalles;
        document.getElementById("numPagAct").innerHTML = "---";
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText)
                numPagina = 0;
                numPagina = parseInt(numPaginaAct);
                desactivar();
                data.Search.forEach(movie => {
                    var imagen = movie.Poster;
                    if (imagen == "N/A") {
                        imagen = "sinImagen.jpg";
                    }
                    detalles += "<tr>" +
                        "<td><a href='#'  style='text-decoration:none'     onclick=\"buscarPorID('" + movie.imdbID + "')\">'<i class='fa fa-eye'></i>'</a>" +
                        "<td>" + movie.Title + "</td>" +
                        "<td>" + movie.Year + "</td>" +
                        "<td>" + movie.Type + "</td>" +
                        "<td><img src=" + imagen + "></td" +
                        "</tr>";
                });
                document.getElementById("tableDetallesPeliculas").innerHTML = detalles;
            }
        };
        xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=2a0107e8=" + titulo + "&plot=full&page=" + numPaginaAct, true);
        xmlhttp.send();
    }
}

function buscarPorID(id) {
    data.Search.forEach(movieB => {
        if (movieB.imdbID == id) {
            DataFullMuvies(id);
        }
    });
    overlay = document.getElementById('overlay');
    popup = document.getElementById('popup');
    overlay.classList.add('active');
    popup.classList.add('active');
}

function cerrarPopup() {
    document.getElementById("texto1").innerHTML = "";
    document.getElementById("portada").innerHTML = "";
    document.getElementById("anioM").innerHTML = "";
    document.getElementById("nomimaM").innerHTML = "";
    document.getElementById("estrenoM").innerHTML = "";
    document.getElementById("duracionM").innerHTML = "";
    document.getElementById("generoM").innerHTML = "";
    document.getElementById("directorM").innerHTML = "";
    document.getElementById("resumenM").innerHTML = "";
    overlay = document.getElementById('overlay');
    popup = document.getElementById('popup');
    overlay.classList.remove('active');
    popup.classList.remove('active');
}

function siguientePagina() {
    numPagina = numPagina + 1;
    console.log(numPagina);
    paginar(numPagina);
}

function anteriorPagina() {
    //  console.log(numPagina);
    numPagina = numPagina - 1;
    paginar(numPagina);
}
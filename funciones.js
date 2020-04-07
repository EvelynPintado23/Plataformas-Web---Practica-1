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
                   // document.getElementById("totalPaginasMostPie").innerHTML = 1;
                } else {
                    document.getElementById("totalPaginasMost").innerHTML = totalResult;
                   // document.getElementById("totalPaginasMostPie").innerHTML = totalResult;
                }
              //  desactivar();
                // busca cada pelicula y nos detalla su informacion 
                document.getElementById("numPagAct").innerHTML = numPagina;
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
        xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=2a0107e8&s=" + titulo + "&plot=full", true);
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
              //  desactivar();
              document.getElementById("numPagAct").innerHTML = numPagina;
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
                document.getElementById("tablaDetallesPeliculas").innerHTML = detalles;
            }
        };
        xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=2a0107e8&s=" + titulo + "&plot=full&page=" + numPaginaAct, true);
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
    popup = document.getElementById('card');
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
   popup = document.getElementById('card');
    overlay.classList.remove('active');
    popup.classList.remove('active');
}


function DataFullMuvies(idP) {
    if (idP == "") {
        detalles = "<tr>" +
            "<td colspan='5'>No informacion disponible...</td>" +
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
                dataDetalles = JSON.parse(this.responseText)
                var imagen = dataDetalles.Poster;
                if (imagen == "N/A") {
                    imagen = "sinImagen.jpg";
                }

                portada = "<img class='card-img-top'   src=" + imagen + ">";
               // portada=imagen;
                titulo = dataDetalles.Title;
                anio = dataDetalles.Year;
                nominal = dataDetalles.Rated;
                duracion = dataDetalles.Runtime;
                genero = dataDetalles.Genre;
                estreno = dataDetalles.Released;
                director = dataDetalles.Director;
                resumen = dataDetalles.Plot;
                idima = dataDetalles.Language;
                pais = dataDetalles.Country;
                actores = dataDetalles.Actors;
                premios = dataDetalles.Awards;
                escritores = dataDetalles.Writer;

               //console.log(dataDetalles.Ratings[0].Source);
                if(dataDetalles.Ratings.length>0){
                    for (let index = 0; index < dataDetalles.Ratings.lenght; index++) {
                        console.log(dataDetalles.Ratings[index].Source);
                        Ratings += "<p>" + dataDetalles.Ratings[index].Source + "</p>"+"<p>" + dataDetalles.Ratings[index].Value + "</p>";
                        
                        
                    }
                }

                Metascore = dataDetalles.Metascore;
                imdbRating = dataDetalles.imdbRating;
                imdbVotes = dataDetalles.imdbVotes;
                Type = dataDetalles.Type;
                DVD = dataDetalles.DVD;
                BoxOffice = dataDetalles.BoxOffice;
                Production = dataDetalles.Production;
                Website = dataDetalles.Website;

                document.getElementById("portada").innerHTML = portada;
                document.getElementById("texto1").innerHTML = titulo;
                document.getElementById("anioM").innerHTML = anio;
                document.getElementById("nomimaM").innerHTML = nominal;
                document.getElementById("estrenoM").innerHTML = estreno;
                document.getElementById("duracionM").innerHTML = duracion;
                document.getElementById("generoM").innerHTML = genero;
                document.getElementById("directorM").innerHTML = director;
                document.getElementById("resumenM").innerHTML = resumen;

                document.getElementById("idiomaM").innerHTML = idima;
                document.getElementById("paisM").innerHTML = pais;
                document.getElementById("actoresM").innerHTML = actores;
                document.getElementById("premiosM").innerHTML = premios;
                document.getElementById("escritorM").innerHTML = escritores;

                document.getElementById("Metascore").innerHTML = Metascore;
                document.getElementById("imdbRating").innerHTML = imdbRating;
                document.getElementById("imdbVotes").innerHTML = imdbVotes;
                document.getElementById("Type").innerHTML = Type;
                document.getElementById("DVD").innerHTML = DVD;
                document.getElementById("BoxOffice").innerHTML = BoxOffice;
                document.getElementById("Production").innerHTML = Production;
                document.getElementById("Website").innerHTML = Website;
                document.getElementById("Ratings").innerHTML = Ratings;
            }
        };
        xmlhttp.open("GET", "https://www.omdbapi.com/?i=" + idP + "&apikey=e38ce2e0&s", true);
        xmlhttp.send();
    }

}

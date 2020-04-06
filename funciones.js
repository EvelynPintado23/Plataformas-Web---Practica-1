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
        detalles = "<tr>" + "<td colspan='5'>Informacion no disponible</td>" + "</tr>";
        document.getElementById("tablaDetallesPeliculas").innerHTML = detalles;
    }else{
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest ();
        }else{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
}
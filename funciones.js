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
            }
        }
    }
}
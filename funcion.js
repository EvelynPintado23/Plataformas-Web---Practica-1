
//Recibir acceso a los datos, conectar la API DE JSON por Javascript

app.appendChild(logo)
app.appendChild(container)

var data = JSON.parse(this.response)
if(request.status >= 200 && request.status < 400){
    data.forEach(movie => {
        const card = document.createElement('div')
        card.setAttribute('class','card')
        const h1 = document.createElement('h1')
        h1.textContent=movie.title
        const p = document.createElement('p')
        movie.description = movie.description.substring(0,300)
        p.textContent = `${movie.document}...`

        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p)
    })
}else{
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Error, no funciona`
    app.appendChild(errorMessage)
}
request.send()
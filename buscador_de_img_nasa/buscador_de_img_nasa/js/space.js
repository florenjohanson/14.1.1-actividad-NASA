document.addEventListener("DOMContentLoaded", function () {



    function realizarBusqueda(palabraClave) {
        const urlBase = 'https://images-api.nasa.gov/search?'; // Quita la palabra clave fija
        const parametros = new URLSearchParams({ q: palabraClave });
        const urlCompleta = `${urlBase}${parametros}`;
        console.log({ parametros })
        console.log({ urlCompleta })
        console.log({ palabraClave })
        fetch(urlCompleta)
            .then(response => response.json())
            .then(({ collection }) => {
                console.log(collection)
                const { items } = collection

                if (items && items.length > 0) {
                    let html = '';

                    items.forEach(item => {

                        const { data = [], links = [] } = item

                        const [{ title, description, date_created }] = data

                        const { href } = links[0] || {}

                       

                        html += `<div class="card" style="width: 18rem;">`
                        if (href) html += `<img src="${href}" class="card-img-top" alt="${title}">`
                        html += `
                            <div class="card-body">
                            <h5>"${title}"</h5>
                                <p class="card-text">${description}</p>
                                <p>${date_created}</p>
                            </div>
                        </div>`;

                    })
                    document.getElementById("mostrarResultados").innerHTML = html;
                } else {

                     document.getElementById("mostrarResultados").innerHTML = " <h3>No se encontraron resultados para la búsqueda</h3>";

                
                }
            })
            .catch(error => {
                console.error('Error en la petición:', error);
            });
    }


    document.getElementById("btnBuscar").addEventListener("click", () => {
        const palabraClave = document.getElementById("inputBuscar").value;
        realizarBusqueda(palabraClave);
    });




});



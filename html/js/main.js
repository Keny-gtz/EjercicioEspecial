
const mainProds = document.getElementById("mainProds");
const loadButton = document.getElementById("loadProducts");
const URLMain = "https://api.escuelajs.co/api/v1/products";
const cards = document.querySelectorAll(".card");

/*function getProducts() {
  fetch(URLMain)
    .then((response) => response.json())
    .then((products) => {
      const producto = products.slice(0, 9);//elige los primeros 9 elementos ordenados 
      createCards(producto);
    })
    .catch((err) => {
      mainProds.innerHTML = `
        <div class="alert alert-danger" role="alert">
          ${err.message}
        </div>`;
    });
}*/

/*function createCards(products) {
  mainProds.innerHTML = '';
  products.forEach(product => {
    //console.log(product.title, product.images); comprobar ell contenido.
    //.substring es para delimitar el texto
    mainProds.insertAdjacentHTML('beforeend', `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
         <img src="${product.images[1]}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
           <p class="card-text">${product.description.substring(0, 100)}...</p> 
            <p class="card-text mt-auto"><strong>$${product.price}</strong></p>
          </div>
        </div>
      </div>
    `);
  });
}

loadButton.addEventListener("click", getProducts);*/

// Corrección de cargar la info de la Api en las tarjetas existentes.

document.addEventListener("DOMContentLoaded", () => {
  const loadButton = document.getElementById("loadProducts");

  loadButton.addEventListener("click", () => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then(response => response.json())
      .then(productos => {
        const cards = document.querySelectorAll(".card");

        for (let i = 0; i < 9 && i < productos.length; i++) {
          const product = productos[i];
          const card = cards[i];
          const existingImg = card.querySelector("img");
          if (existingImg) {
            existingImg.remove();
          }

          // Actualiza imagen
          const img = card.querySelector("svg");
          if (img) {
            img.remove(); // Elimina SVG placeholder
            const imgElement = document.createElement("img");
            imgElement.src = product.images[1];//colocamos la segunda imagen
            imgElement.className = "card-img-top";
            imgElement.alt = product.title;
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.referrerPolicy = "no-referrer"; //Esta opción indica que no se debe enviar ningún dato de Referer con la solicitud

             card.insertBefore(imgElement, card.firstChild);
            
          }
          const desc = card.querySelector(".card-text");
          if (desc) {
            desc.innerHTML = `<strong>${product.title}</strong><br>${product.description}`;
          }
          const price = card.querySelector(".text-body-secondary");
          if (price) {
            price.textContent = `$${product.price}`;
          }
        }
      })
      .catch(error => {
        console.error("Error al cargar los productos:", error);
      });
  });
});

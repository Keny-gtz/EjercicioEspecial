
const mainProds = document.getElementById("mainProds");
const loadButton = document.getElementById("loadProducts");
const URLMain = "https://api.escuelajs.co/api/v1/products";

function getProducts() {
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
}

function createCards(products) {
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

loadButton.addEventListener("click", getProducts);
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

document.getElementById('updateProductBtn').addEventListener('click', () => {
  const loader = document.querySelector('.loader');
  const output = document.getElementById('apiOutput');
  const productId = 1;
  const url = `https://fakestoreapi.com/products/${productId}`;

  loader.style.display = 'block';
  output.textContent = '';

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      loader.style.display = 'none';
      output.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      loader.style.display = 'none';
      output.textContent = 'Error fetching product data.';
      console.error(error);
    });
});



const updateBtn = document.getElementById('updateProductBtn');
const loader = document.getElementById('loader');
const productsContainer = document.getElementById('productsContainer');
const sortSelect = document.getElementById('sort');

let products = [];

function renderProducts(productsToRender) {
  productsContainer.innerHTML = '';

  productsToRender.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    
    productDiv.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}" alt="${product.title}" width="100" />
      <p>Price: $${product.price}</p>
    `;

    productsContainer.appendChild(productDiv);
  });
}

function sortProducts() {
  let sortedProducts = [...products];

  switch(sortSelect.value) {
    case 'price-asc':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    default:
   
      break;
  }

  renderProducts(sortedProducts);
}

updateBtn.addEventListener('click', () => {
  loader.style.display = 'block';
  productsContainer.innerHTML = '';

  fetch('https://fakestoreapi.com/products?limit=5')
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(data => {
      loader.style.display = 'none';
      products = data;
      sortProducts();
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error('Fetch failed:', error);
      alert('Failed to load products.');
    });
});

sortSelect.addEventListener('change', () => {
  if (products.length) {
    sortProducts();
  }
});

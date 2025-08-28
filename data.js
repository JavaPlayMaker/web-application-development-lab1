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

document.getElementById('loadBtn').addEventListener('click', () => {
  const productId = 1;
  const url = `https://fakestoreapi.com/products/${productId}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(product => {
      document.getElementById('productTitle').textContent = product.title;
      document.getElementById('productImage').src = product.image;
      document.getElementById('productPrice').textContent = product.price;
      document.getElementById('productDescription').textContent = product.description;
      document.getElementById('productDetails').style.display = 'block';
    })
    .catch(error => {
      console.error('Fetch failed:', error);
      alert('Failed to load product data.');
    });
});

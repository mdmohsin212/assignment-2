fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=ch")
  .then((res) => res.json())
  .then((data) => {
    const Products = data.meals.slice(0, 15);
    const container = document.getElementById("meal-container");
    ShowProduct(Products, container);
  })
  .catch((error) => console.log("Fetch Error"));

document.getElementById("submit").addEventListener("click", (event) => {
  const searchItem = document.getElementById("Search-text").value;
  const container = document.getElementById("meal-container");
  container.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`)
    .then((res) => res.json())
    .then((data) => {
      const Products = data.meals;
      const container = document.getElementById("meal-container");
      if (!Products) {
        container.innerHTML =
          "<h1 class = 'text-center'>No products found!</h1>";
        return;
      }
      ShowProduct(Products, container);
    })
    .catch((error) => console.log("Fetch Error!"));
});

const ShowProduct = (Products, container) => {
  Products.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add(
      "col-md-3",
      "col-12",
      "d-flex",
      "text-center",
      "mt-4",
      "fw-bold"
    );
    div.innerHTML = `
        <div class="card" style="width: 30rem; height : 480px">
        <img src="${
          element.strMealThumb
        }" class="card-img-top img-fluid rounded-circle mx-auto d-block w-50" alt="..." />
        <div class="card-body">
          <p class="card-title">Recipe Name : ${element.strMeal}</p>
          <p>Catagory : ${element.strCategory}</p>
          <p>Origin : ${element.strArea}</p>
          <p>About : ${element.strInstructions.slice(0, 70)}</p>
          <div class = "fs-3">
            <a target="_blank" href="https://www.facebook.com/profile.php?id=100082320175940"
                class="text-decoration-none"><i class="fa-brands fa-facebook"
                  style="color: #74C0FC;"></i></a>
            <a target="_blank" href="${
              element.strYoutube
            }"><i class="fa-brands fa-youtube"
                  style="color: #74C0FC;"></i></a>
            <a target="_blank" href="https://github.com/mdmohsin212/"
                class="text-decoration-none"><i class="fa-brands fa-github"
                  style="color: #74C0FC;"></i></a>
          </div>
          <button type="button" class="btn btn-success" onclick="addCart('${
            element.strMeal
          }')">Add To Cart</button>
         <button type="button" class="btn btn-success" onclick = "showInfo('${
           element.idMeal
         }')">Deatils</button>
        </div>
      </div>
        `;
    container.appendChild(div);
  });
};

const Cartcount = document.getElementById("count").innerHTML;
let value = parseInt(Cartcount);

const addCart = (product) => {
  const container = document.getElementById("cart-item");
  const div = document.createElement("div");
  value++;
  if (value <= 11) {
    document.getElementById("count").innerHTML = value;
    div.innerHTML = `
    <h3>${product}</h3><hr>
  `;
    container.appendChild(div);
  } else {
    alert("Cart Already Full!");
  }
};

const showInfo = (productId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${productId}`)
    .then((res) => res.json())
    .then((data) => {
      const product = data.meals[0];

      const title = document.getElementById("modal-title");
      title.innerHTML = product.strMeal;

      const container = document.getElementById("modal-body");
      container.innerHTML = "";
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${product.strMealThumb}" class="card-img-top img-fluid rounded-circle mx-auto d-block w-50" alt="..." />
        <div class="card-body">
          <ul>
            <li>${product.strIngredient1}</li>
            <li>${product.strIngredient2}</li>
            <li>${product.strIngredient3}</li>
            <li>${product.strIngredient4}</li>
            <li>${product.strIngredient5}</li>
            <li>${product.strIngredient6}</li>
            <li>${product.strIngredient7}</li>
            <li>${product.strIngredient8}</li>
          </ul>
    `;
      container.appendChild(div);
      const modal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modal.show();
    })
    .catch((error) => console.log("Fetch Error"));
};
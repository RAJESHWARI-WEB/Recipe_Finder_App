document.getElementById("button").addEventListener('click', () => {
    let inputValue = document.getElementById('inputName').value.trim();
    let details = document.getElementById("details");
    details.innerHTML = "";

    if (inputValue === "") {
        alert("Please enter a meal name!");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById("items");
            items.innerHTML = "";

            if (data.meals == null) {
                document.getElementById("msg").style.display = "block";
            } else {
                document.getElementById("msg").style.display = "none";

                data.meals.forEach(meal => {
                    let itemDiv = document.createElement("div");
                    itemDiv.className = "m-2 singleItem";
                    itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`);

                    itemDiv.innerHTML = `
                        <div class="card" style="width: 12rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body text-center">
                                <h5 class="card-text">${meal.strMeal}</h5>
                            </div>
                        </div>
                    `;
                    items.appendChild(itemDiv);
                });
            }
        });
});

function details(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            let meal = detail.meals[0];
            let details = document.getElementById("details");
            details.innerHTML = "";

            let detailsDiv = document.createElement("div");
            detailsDiv.innerHTML = `
                <div class="card" style="width: 22rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h3 class="card-text">${meal.strMeal}</h3>
                        <h6>Ingredients</h6>
                        <ul>
                            <li>Area: ${meal.strArea}</li>
                            <li>Category: ${meal.strCategory}</li>
                            <li>${meal.strIngredient1 || ''}</li>
                            <li>${meal.strIngredient2 || ''}</li>
                            <li>${meal.strIngredient3 || ''}</li>
                            <li>${meal.strIngredient4 || ''}</li>
                            <li>${meal.strIngredient5 || ''}</li>
                        </ul>
                    </div>
                </div>
            `;
            details.appendChild(detailsDiv);
        });
}

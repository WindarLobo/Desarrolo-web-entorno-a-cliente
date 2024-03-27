/* Busca ciudades introduciendo un nombre (ej. Vigo) o
la ciudad y el código del país (ej. Vigo,es) */
function appJSmeteorologia() {
  const form = document.querySelector(".top-banner form");
  const input = document.querySelector(".top-banner input");
  const msg = document.querySelector(".top-banner .msg");
  const list = document.querySelector(".ajax-section .cities");
  /* RELLENA AQUÍ TU API KEY: https://home.openweathermap.org/users/sign_up*/
  const apiKey = "4d8fb5b93d4af21d66a2948710284366";

  form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    // Comprueba si ya está presente la tarjeta de la ciudad (buscada anteriormente)
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
      const filteredArray = listItemsArray.filter(el => {
        let content = "";
        // Vigo,es
        if (inputVal.includes(",")) {
          // Vigo,essss->código de país inválido, por lo que nos quedamos con la 1ª parte de inputVal
          if (inputVal.split(",")[1].length > 2) {
            inputVal = inputVal.split(",")[0];
            content = el
              .querySelector(".city-name span")
              .textContent.toLowerCase();
          } else {
            content = el.querySelector(".city-name").dataset.name.toLowerCase();
          }
        } else {
          // Vigo
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        } // vigo
        return content == inputVal.toLowerCase();
      });

      if (filteredArray.length > 0) {
        msg.textContent = `Ya has buscado el tiempo en ${
          filteredArray[0].querySelector(".city-name span").textContent
        }... Si buscas otro lugar especifica el código del país (Ej. Vigo,es) 😉`;
        form.reset();
        input.focus();
        return;
      }
    }

    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
          weather[0]["icon"]
        }.svg`;

        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
          <figure>
            <img class="city-icon" src="${icon}" alt="${
          weather[0]["description"]
        }">
            <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
        `;
        li.innerHTML = markup;
        list.appendChild(li);
      })
      .catch(() => {
        msg.textContent = "No se encuentra esa ciudad 😩";
      });

    msg.textContent = "";
    form.reset();
    input.focus();
  });
}

const input_id = document.querySelector("#search");
const footer = document.querySelector(".footer");
const current_weather_img = document.querySelector(".current_weather_info");
const api_key = ""

// This function displays weather forcast for
// the whole day
const handle_display_other_weather = (data) => {
  if (!data) {
    return;
  }

  footer.className = "show_footer";

  footer.innerHTML = data.map((weather) => {
    return `
              <div>
                <p id="other-weather">${weather}</p>
                <img src="./images/cloud.png" alt="weather" class="other-weather-image" />
                <h1 id="other-weather-deg">20º</h1>
              </div>
              `;
  });
};

// This function displays  weather forcast for the
// current time
const handle_display_current_weather = (data) => {
  if (!data) {
    return (current_weather_img.innerHTML = `
        <img src="./images/cloud.png" alt="weather" class="floating-image" />
        <p id="weather">No data</p>
       
    `);
  }
  current_weather_img.innerHTML = `
        <img src="./images/cloud.png" alt="weather" class="floating-image" />
        <h1 id="deg">20<span class="sub_text">ºc</span></h1>
        <p id="weather">Partly cloud</p>
       
    `;
};

// This function searchs for the weather forcast
// of a city
const search_data = async(city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`
    );

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
  // Data processed is been passed to the below
  // functions to display content on the screen
  // handle_display_current_weather(data);
  // handle_display_other_weather(data);
};

// This function collects data from the
// input field
const handle_search = () => {
  const city_name = input_id.value.trim();
  // The if conditional statement would only
  // work if the user inputed a value
  if (city_name) {
    // input field value sent is been passed as a
    // parameter to search_data function for data processing
    search_data(city_name);
  }
};

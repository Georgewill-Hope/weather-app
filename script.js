const input_id = document.querySelector("#search");
const footer = document.querySelector(".footer");
const current_weather_info = document.querySelector(".current_weather_info");
const errorMessage = document.querySelector("#title");
const api_key = "26c192cba0de31f9044001a6e0589554";

// This function displays weather forcast for
// the whole day
const handle_display_other_weather = (data) => {
  // we are adding a new class to our footer and
  // the old class was removed as well
  footer.className = "show_footer";

  // data is been displayed using the code below
  footer.innerHTML = data.map((item) => {
    // This helps us set our time format correctly
    const time = new Date(item.dt_txt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `
              <div>
                <p id="other-weather">${time}</p>
                <img src="https://openweathermap.org/img/wn/${
                  item.weather[0].icon
                }@2x.png" alt="weather" class="other-weather-image" />
                <h1 id="other-weather-deg">${Math.floor(
                  item.main.humidity
                )}º</h1>
                <p id="other-weather">${item.weather[0].description}</p>
              </div>
              `;
  });
};

// This function displays  weather forcast for the
// current time
const handle_display_current_weather = (data) => {
  const currentWeather = data.list[0];
  return (current_weather_info.innerHTML = `
        <p>${data.city.name}, ${data.city.country}</p>
        <img src="https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png" alt="weather" class="floating-image" />
        <h2 id="deg">${currentWeather.main.humidity}<span class="sub_text">ºc</span></h2>
        <p id="weather">${currentWeather.weather[0].description}</p>
       
    `);
};

// This function searchs for the weather forcast
// of a city
const search_data = async (city) => {
  try {
    // This helps us fetch our data from open weather map api
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
        city
      )}&appid=${api_key}&units=metric`
    );

    // we are converting the fetched data to be readable in
    // javaScript, which is javascript object notation

    const data = await response.json();

    // if for some reasons our user entered an unkown city
    // the below code would run
    if (!response.ok) {
      footer.className = "footer";
      footer.innerHTML = "";

      current_weather_info.innerHTML = `
        <img src="./images/cloud.png" alt="weather" class="floating-image" />
        <h1 class="title" id="title">City not found. Please enter a valid city.</h1>
      `;
      return;
    }

    // we are getting the whole weather forcast for the
    // day here
    const today = new Date().toISOString().split("T")[0];
    const todayWeather = data.list.filter(
      (weather) => weather.dt_txt.split(" ")[0] === today
    );

    // calling our functions and giving them the required
    // parameters
    handle_display_current_weather(data);
    handle_display_other_weather(todayWeather);
  } catch (error) {
    // If for some reasons something interupted our data
    // fetching the below code should show
    current_weather_info.innerHTML = `
        <img src="./images/cloud.png" alt="weather" class="floating-image" />
        <h1 class="title">Unable to fetch weather data. Please try again.</h1>
      `;
  }
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

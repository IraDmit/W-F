<template>
  <div class="home" :class="{ heat: isHeat, warm: isWarm, cold: isCold }">
    <div class="img_city"></div>
    <div class="cloud"></div>
    <div class="scale">
      <p>Шкала измерения:</p>
      <select v-model="scale">
        <option value="f">° F</option>
        <option value="c">° C</option>
      </select>
    </div>
    <div class="searchWrp">
      <input
        type="text"
        @change="searchRegion($event.target.value)"
        class="search_input"
        v-model="req"
      />
      <div class="search_result" v-if="list_cities">
        <ul v-for="(item, idx) in list_cities" :key="idx" class="list_res">
          <li @click="choiceCity(item)" class="list_item">
            <p class="city">
              {{ item.name }}
            </p>
            <p class="country">
              {{ item.country }}
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div class="region" v-if="weather">
      <div class="region_info">
        <div class="name">
          {{ weather.location.name }}
        </div>
        <div class="country">
          {{ weather.location.country }}
        </div>
      </div>
      <div class="last_update">
        {{ weather.current.last_updated }}
      </div>
      <div class="weatherInfo">
        <div class="condition">
          <img
            :src="weather.current.condition.icon"
            alt="weather.current.condition.icon"
          />
          <p>{{ weather.current.condition.text }}</p>
        </div>
        <div class="temperature">
          <div class="realTemp">
            <p>
              Температура:
              {{
                scale == "c" ? weather.current.temp_c : weather.current.temp_f
              }}
            </p>
          </div>
          <div class="feelsTemp">
            <p>
              Ощущается как:
              {{
                scale == "c"
                  ? weather.current.feelslike_c
                  : weather.current.feelslike_f
              }}
            </p>
          </div>
        </div>
        <div class="wind">
          <p>
            Направление: {{ weather.current.wind_dir }}
            <img
              src="./assets/pngwing.com.png"
              alt="./assets/pngwing.com.png"
              :style="{
                transform: `rotate(${weather.current.wind_degree}deg)`,
              }"
              class="wind_img"
              style="color: red"
            />
          </p>
          <p>Скорость: {{ weather.current.wind_kph }} км/час</p>
          <p>Порывы: {{ weather.current.gust_kph }} км/час</p>
        </div>
        <div class="pressure">
          <p>Давление: {{ weather.current.pressure_mb }}</p>
        </div>
        <div class="uv">УФ-индекс: {{ weather.current.uv }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      weather: null,
      list_cities: null,
      current_city: null,
      scale: "c",
      req: null,
      isCold: false,
      isWarm: false,
      isHeat: false,
    };
  },
  methods: {
    async searchRegion(value) {
      try {
        const { data } = await this.axios.get(
          `http://api.weatherapi.com/v1/search.json?key=81200ab647f143a39fb154726231905&q=${value}&lang=ru`
        );
        this.list_cities = data;
      } catch (error) {
        console.log(error);
      }
    },
    async choiceCity(item) {
      this.list_cities = "";
      this.req = item.name;
      this.current_city = item;
      if (item.name.includes("-")) {
        this.req = item.name.split("-")[0];
      }
      try {
        const { data } = await this.axios.get(
          `http://api.weatherapi.com/v1/current.json?key=81200ab647f143a39fb154726231905&q=${this.req}&lang=ru`
        );
        this.weather = data;
        console.log(this.weather.current.temp_c);
        if (this.weather.current.temp_c > 28) {
          this.isHeat = true;
        } else if (this.weather.current.temp_c < 12) {
          this.isCold = true;
        } else {
          this.isWarm = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100vh;
  background-image: linear-gradient(
    180deg,
    rgba(34, 139, 230, 0.25) 11%,
    rgba(59, 201, 219, 0.25) 64%
  );
  &.heat {
    background-image: radial-gradient(
      circle,
      rgba(250, 176, 5, 0.65) 22%,
      rgba(255, 135, 135, 0.65) 87%
    );
  }
  &.warm {
    background-image: radial-gradient(
      circle,
      rgba(251, 171, 126, 0.4) 18%,
      rgba(247, 206, 104, 0.4) 76%
    );
  }
  &.cold {
    background-image: radial-gradient(circle, #4b6cb7 28%, #182848 93%);
  }
  .img_city {
    position: absolute;
    background-image: url("https://pngimg.com/d/city_PNG20.png");
    height: 100vh;
    background-repeat-y: no-repeat;
    background-position-y: bottom;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
  .cloud {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-image: url("https://www.pngmart.com/files/1/Clouds-PNG-Pic.png");
    background-repeat: no-repeat;
    &.thunderclouds {
      background-image: url("./assets/wallpaperbetter.com_3840x2160.jpg");
    }
  }
}
p {
  margin: 0;
}
.searchWrp {
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 50;
  margin: 20px;
  .search_input {
    width: 100%;
    padding: 5px;
    border-radius: 8px;
  }
  .search_result {
    border: 1px solid #000;
    position: absolute;
    width: 100%;
    top: 27px;
    left: 0;
    border-radius: 0 0 8px 8px;
    background-color: #fff;
    z-index: 100;
    .list_res {
      list-style: none;
      padding: 0;
      .list_item {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
      }
    }
  }
}
.region {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  z-index: 15;
}
.weatherInfo {
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #000;
  }
}
.wind_img {
  width: 20px;
  height: 20px;
}
</style>

<template>
  <div
    class="home"
    :class="{ heat: isHeat, warm: isWarm, cold: isCold, night: isNight }"
  >
    <div class="img_city"></div>
    <div class="cloud" :class="{ thunderclouds: isRain }"></div>
    <div class="container">
      <div class="header_wrp">
        <div class="searchWrp">
          <input
            type="text"
            @change="searchRegion($event.target.value)"
            class="search_input"
            v-model="req"
            placeholder="Введите название города"
          />
          <template v-if="list_cities">
            <div class="search_result">
              <ul class="list_res">
                <li
                  @click="choiceCity(item)"
                  class="list_item"
                  v-for="(item, idx) in list_cities"
                  :key="idx"
                >
                  <p class="city">
                    {{ item.name }}
                  </p>
                  <p class="country">
                    {{ item.country }}
                  </p>
                </li>
              </ul>
            </div>
          </template>
        </div>
        <div class="scale">
          <p>Шкала измерения:</p>
          <select v-model="scale">
            <option value="f">° F</option>
            <option value="c">° C</option>
          </select>
        </div>
      </div>

      <div class="region" v-if="weather">
        <div class="region_info">
          <div class="location">
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
      isNight: false,
      isRain: false,
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
        if (this.weather.current.temp_c > 28) {
          this.isHeat = true;
        } else if (this.weather.current.temp_c < 12) {
          this.isCold = true;
        } else {
          this.isWarm = true;
        }
        this.weather?.current?.is_day == "1"
          ? (this.isNight = false)
          : (this.isNight = true);
        this.weather.current.condition.text.includes("дожд")
          ? (this.isRain = true)
          : (this.isRain = false);
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
  transition-delay: 0.3s;
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
  .wind_img {
    width: 20px;
    height: 20px;
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

  .container {
    max-width: 1200px;
    margin: 0 auto;
    z-index: 15;
    width: 100%;
    .header_wrp {
      display: flex;
      width: 100%;
      margin-top: 20px;
      width: 100%;
      align-items: center;
      .scale {
        border-radius: 4px;
        padding: 9px 10px;
        background-color: #fff;
        z-index: 11;
        display: flex;
        margin-left: auto;
        border: 1px solid #ccc;
        &:focus,
        &:hover {
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.2);
          outline: none;
        }
        p {
          display: flex;
          align-items: center;
          font-size: 17px;
          margin-right: 10px;
        }
        select {
          padding: 3px;
        }
      }
      .searchWrp {
        display: flex;
        margin-left: 346px;
        max-width: 500px;
        width: 100%;
        position: relative;
        z-index: 50;
        .search_input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
          background-color: white;
          background-image: url("https://mywebicons.ru/i/png/736d4847613448a02454686dd5efb020.png");
          background-size: 23px;
          background-position: 10px 10px;
          background-repeat: no-repeat;
          padding: 12px 20px 12px 40px;
          &:focus,
          &:hover {
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2),
              0 4px 6px rgba(0, 0, 0, 0.2);
            outline: none;
          }
        }
        .search_result {
          box-shadow: 0 9px 8px -3px rgba(64, 60, 67, 0.24),
            8px 0 8px -7px rgba(64, 60, 67, 0.24),
            -8px 0 8px -7px rgba(64, 60, 67, 0.24);
          position: absolute;
          width: 100%;
          top: 45px;
          left: 0;
          border-radius: 0 0 4px 4px;
          background-color: #fff;
          z-index: 100;
          .list_res {
            list-style: none;
            padding: 0;
            margin: 0;
            .list_item {
              display: flex;
              justify-content: space-between;
              cursor: pointer;
              padding: 10px;
              font-size: 18px;
              .country {
                color: #9b9b9b;
              }
              &:not(:last-of-type) {
                border-bottom: 1px solid rgba(64, 60, 67, 0.24);
              }
            }
          }
        }
      }
      @media (max-width: 1200px) {
        .searchWrp {
          margin-left: 0;
          margin: 0 auto;
        }
      }
      @media (max-width: 768px) {
        .scale {
          margin-left: 0;
          max-height: 44px;
          p {
            font-size: 14px;
          }
        }
        .searchWrp {
          margin-right: 10px;
        }
      }
      @media (max-width: 576px) {
        flex-direction: column-reverse;
        .scale {
          max-width: 500px;
          width: 100%;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }
        .searchWrp {
          margin: 0;
        }
      }
    }
  }
  p {
    margin: 0;
  }
  .region {
    max-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    z-index: 15;
    margin: 15px auto;
    border: 1px solid #ccc;
    .region_info {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 20px;
      }
      .country {
        font-size: 16px;
        color: #9b9b9b;
      }
    }
    .weatherInfo {
      display: flex;
      flex-direction: column;
      & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        &:not(:last-of-type) {
          border-bottom: 1px solid #ccc;
        }
      }
      .condition {
        flex-direction: column;
      }
    }
    @media (max-width: 576px) {
      max-width: 500px;
      width: 100%;
      .wind {
        flex-wrap: wrap;
      }
    }
  }

  @media (max-width: 1200px) {
    padding: 0 50px;
  }
  @media (max-width: 991px) {
    padding: 0 30px;
  }
  @media (max-width: 768px) {
    padding: 0 15px;
  }

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
  &.night {
    background-image: url("https://phonoteka.org/uploads/posts/2022-09/1663882795_1-phonoteka-org-p-zvezdi-oboi-na-rabochii-stol-krasivo-2.jpg");
    background-repeat: no-repeat;
    // background-size: 100vh;
  }
}
</style>

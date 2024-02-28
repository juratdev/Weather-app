<script setup>
import { ref, onMounted } from "vue";
const regionTitle = ref("Toshkent viloyati");
const weatherData = ref(null);
import { regions, days, weatherAPI } from "@/config/index";
import moment from "moment";

const getRegionWeather = async (lat, lon, name) => {
  regionTitle.value = name;
  try {
    const response = await weatherAPI.get(`/data/2.8/onecall`, {
      params: {
        lat,
        lon,
        exclude: "minutely,hourly,alerts",
        appid: "04ec129461449c3117baadcc5c000d3b",
        units: "metric",
        lang: "ru",
      },
    });
    weatherData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const getDefaultRegionWeather = async () => {
  try {
    const response = await weatherAPI.get(`/data/2.8/onecall`, {
      params: {
        lat: 41.311081,
        lon: 69.240562,
        exclude: "minutely,hourly,alerts",
        appid: "04ec129461449c3117baadcc5c000d3b",
        units: "metric",
        lang: "ru",
      },
    });
    weatherData.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getWeatherIconURL = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

onMounted(() => {
  getDefaultRegionWeather();
});
</script>
<template>
  <div class="h-screen bg-emerald-100">
    <div class="container px-4 mx-auto">
      <div
        class="grid items-center justify-center grid-cols-12 gap-6 pt-5 mx-auto pb-7"
      >
        <main v-if="weatherData" class="col-span-10 md:col-span-9">
          <div class="flex items-end justify-between">
            <div>
              <h2 class="mb-2 text-3xl font-bold">{{ regionTitle }}</h2>
              <p class="mb-4 text-lg font-medium">
                {{ moment(new Date().getTime()).format("DD-MMMM") }}
              </p>
              <div class="flex items-end gap-3">
                <div class="flex">
                  <h1 class="text-7xl">
                    {{ Math.round(weatherData.current.temp) }}
                  </h1>
                  <span class="text-4xl">&deg;C</span>
                </div>
                <p>{{ weatherData.current.weather[0].description }}</p>
              </div>
            </div>
            <div class="w-32">
              <img
                :src="getWeatherIconURL(weatherData.current.weather[0].icon)"
                class="w-full"
                alt="Weather Icon"
              />
            </div>
          </div>

          <div class="flex flex-col gap-3 p-5 mt-5 text-white bg-emerald-900">
            <div v-for="(day, index) in days" :key="index">
              <div class="flex justify-between gap-16">
                <div class="flex items-end gap-2 mt-auto">
                  <h4 class="text-xl">
                    {{ day.name }}
                  </h4>
                  <span class="text-xs font-medium md:text-base"
                    >(
                    {{
                      moment(
                        new Date().getTime() + index * 24 * 60 * 60 * 1000
                      ).format("DD-MM")
                    }})</span
                  >
                </div>
                <div class="flex gap-3">
                  <img
                    class="w-10 bg-white"
                    :src="
                      getWeatherIconURL(
                        weatherData.daily[index].weather[0].icon
                      )
                    "
                    alt="img"
                  />
                  <div class="flex w-10">
                    <h1 class="text-xl">
                      {{ Math.round(weatherData.daily[index].temp.day) }}
                    </h1>
                    <span class="text-lg">&deg;C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <aside
          v-if="weatherData"
          class="col-span-4 p-4 md:rounded-xl lg:col-span-3"
        >
          <div class="flex flex-col space-x-4 text-white bg-emerald-900">
            <h3 class="mb-1 ml-12">Hududlar</h3>
            <div
              v-for="(item, index) in regions"
              class="flex items-center gap-5 pb-3"
              @click="getRegionWeather(item.lat, item.lon, item.name)"
            >
              <input
                :key="index"
                type="radio"
                :id="'checkbox' + index"
                name="region"
                class="w-4 h-4 cursor-pointer form-radio"
                :checked="index === 0"
              />
              <label :for="'checkbox' + index" class="cursor-pointer">{{
                item.name
              }}</label>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style></style>

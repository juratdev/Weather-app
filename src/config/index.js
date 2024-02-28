import moment from "moment";
import axios from "axios";

export const weatherAPI = axios.create({
  baseURL: "https://api.openweathermap.org",
});

export const formatDate = (date, format = "dddd", lang = "uz") => {
  moment.updateLocale("uz", {
    weekdays: [
      "Yakshanba",
      "Dushanba",
      "Seshanba",
      "Chorshanba",
      "Payshanba",
      "Juma",
      "Shanba",
    ],
  });
  moment.locale(lang);
  return moment(date).format(format);
};
export const regions = [
  {
    name: "Toshkent viloyati",
    lat: 41.311081,
    lon: 69.240562,
  },
  {
    name: "Andijon viloyati",
    lat: "40.7833471",
    lon: "72.3506746",
  },
  {
    name: "Buxoro viloyati",
    lat: "39.7675529",
    lon: "64.4231326",
  },
  {
    name: "Fargʻona viloyati",
    lat: "40.3764879",
    lon: "71.7913193",
  },
  {
    name: "Jizzax viloyati",
    lat: "40.1331797",
    lon: "67.8234081",
  },
  {
    name: "Urgench shahri",
    lat: "41.5517903",
    lon: "60.631281",
  },
  {
    name: "Namangan viloyati",
    lat: "40.9996482",
    lon: "71.6726238",
  },
  {
    name: "Navoiy viloyati",
    lat: "40.1034582",
    lon: "65.3734221",
  },
  {
    name: "Qashqadaryo viloyati",
    lat: "40.1034582",
    lon: "6export 5.3734221",
  },
  {
    name: "Nukus shahri ",
    lat: "42.4600229",
    lon: "59.6176603",
  },
  {
    name: "Samarqand viloyati",
    lat: "39.6550017",
    lon: "66.9756954",
  },
  {
    name: "Sirdaryo viloyati",
    lat: "40.8309135",
    lon: "68.6661865",
  },
];

import type { City } from "@components/CityItem";

const BACKEND_BASE_URL = "http://localhost:5000";
const BIGDATA_BASE_URL = "https://api.bigdatacloud.net/data";

export const createCity = async (city: Omit<City, "id">) => {
  const init: RequestInit = {
    method: "POST",
    body: JSON.stringify(city),
    headers: { "content-type": "application/json" },
  };
  const res = await fetch(`${BACKEND_BASE_URL}/cities`, init);
  const data = await res.json();
  return data;
};

export const deleteCity = async (id: string) => {
  const init: RequestInit = { method: "DELETE" };
  await fetch(`${BACKEND_BASE_URL}/cities/${id}`, init);
};

export const fetchCities = async (): Promise<City[]> => {
  const res = await fetch(`${BACKEND_BASE_URL}/cities`);
  const data = await res.json();
  return data;
};

export async function fetchCityByLatlng(lat: string, lng: string) {
  if (!(+lat && +lng)) return;
  const url = `${BIGDATA_BASE_URL}/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.countryCode) {
    throw new Error("That doesn't seem to be a city. Click somewhere else.🙁");
  }
  return data;
}

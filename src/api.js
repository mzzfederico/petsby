import ky from "ky";

const resources = {
    getAnimals: "https://api.petfinder.com/v2/animals"
};

export async function getAnimals({ type = "", gender = "", age = "", city = "", page = 1 }) {
    const data = await ky.get(resources.getAnimals, {
        searchParams: { type, gender, age, city, page }
    });

    return data;
}
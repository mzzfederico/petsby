/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
require("dotenv").config();
const path = require("path");
const fetch = require("node-fetch");

const keys = {
    client_id: process.env.PETFINDER_KEY,
    client_secret: process.env.PETFINDER_SECRET
};

exports.createPages = async ({ actions, reporter }) => {
    const { createPage } = actions;

    const tokenReq = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        body: "grant_type=client_credentials&client_id=" + keys.client_id + "&client_secret=" + keys.client_secret,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    });

    const tokenJson = await tokenReq.json();

    if (tokenJson.status > 400) {
        reporter.panicOnBuild("Error fetching token on build time.");
        return;
    }

    const petsReq = await fetch("https://api.petfinder.com/v2/animals", {
        headers: {
            Authorization: `Bearer ${tokenJson.access_token}`
        },
        method: "GET"
    });

    if (petsReq.error) {
        reporter.panicOnBuild("Error fetching latest pets on build time.");
        return;
    }

    const petsJson = await petsReq.json();
    const latestPets = petsJson.animals;

    const petTemplate = path.resolve("src/pages/pet.js");
    latestPets.forEach((pet) => {
        const path = `/${pet.gender.toLowerCase()}/${pet.id}`;
        createPage({
            path,
            component: petTemplate,
            context: {
                pagePath: path,
                pet
            },
        });
    });

    // Generic routes for those animals that aren't prerendered
    createPage({
        path: "/dog/:id",
        matchPath: "/dog/:id",
        component: petTemplate
    });
    createPage({
        path: "/cat/:id",
        matchPath: "/cat/:id",
        component: petTemplate
    });
};

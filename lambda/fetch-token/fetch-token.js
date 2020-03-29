/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function (event, context) {
    try {
        const searchParams = {
            grant_type: "client_credentials",
            client_id: process.env.PETFINDER_KEY,
            client_secret: process.env.PETFINDER_SECRET
        };
        const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
            body: "grant_type=client_credentials&client_id=" + searchParams.client_id + "&client_secret=" + searchParams.client_secret,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })

        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            return { statusCode: response.status, body: response.statusText }
        }
        const data = await response.json()

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (err) {
        console.log(err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ err }) // Could be a custom message or object i.e. JSON.stringify(err)
        }
    }
}

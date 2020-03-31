# Petsby: an experiment in Gatsby.js

## Install and run

Install as usual with `npm i`. To run the project, please install the [Netlify-Dev cli](https://github.com/netlify/cli/blob/master/docs/netlify-dev.md) and run `netlify dev`.

It needs it as it uses a lambda function to provide the server side call to the API of Petfinder.com safely, instead of bundling the keys with the static application. Other than that, this is a common Gatsby project. Note that I've attached an example for the `.env` file required to fetch from the APIs.

## Thoughts

The autocomplete is based on a json of the 1000 biggest cities in America, loaded into GraphQL and queried. If I had more time I would've built it over the API for organizations, as it probably is the closest endpoint for the business domain.

Style is based on Styled-JSX, without using any design system, though in retrospect I should've used one as it makes things nicer. As it is, I'm only using Gatsby, React, Fontawesome icons and ky (a lightweight fetch library), plus the infrastructure from Netlify to provide a basic environment around the static build. It is in fact hosted at [this url](https://petsby.netlify.com/), though unfortunately a bug prevents the token endpoint from working.

The search is handled mainly by a pseudo global context, which has a reducer behind that allows for different operations (filters, search, pagination etc.) in different places of the page. A generic hook does the data fetching, again with a reducer; it's missing abort control and cancellation but should be fine enough for an example. Token is handled by an effect that stores it in a localStorage key.
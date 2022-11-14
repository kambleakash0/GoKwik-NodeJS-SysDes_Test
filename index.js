const axios = require('axios');

// Here we can have a list of some 'k' bank server API endpoints with the most success rate in last one hour
let endpoints = [
    'https://api.github.com/repos/kambleakash0/kambleakash0/commits',
    'https://api.github.com/repos/kambleakash0/weather_nodejs/commits',
    'https://api.github.com/repos/kambleakash0/chat_app_nodejs/commits',
    'https://api.github.com/repos/kambleakash0/notes_nodejs/commits'
];

// We can use the above list to make requests and check responses, whichever first valid response is, we can go ahead with that one.
// This will take 50ms on avg for getting response from bank
Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
    .then(axios.spread((response1, response2, response3, response4) => {
        // Here we can process them, go through the list with O(n) cost and stop when we get the first valid response and
        // go forward with that bank for payments and reject other banks. No transaction from other banks gets completed so no charges.
        // We'll pay for only one call this way and there's no other way to implement this.
        r1 = response1.data;
        r2 = response2.data;
        r3 = response3.data;
        r4 = response4.data;
        [r1, r2, r3, r4].forEach((response) => {
            if (response.length > 5) {
                console.log(response[0].url.split('/')[5] + ' : ' + response.length + ' commits')
            }
        })
    }))
    .catch(error => {
        console.log(error);
    });
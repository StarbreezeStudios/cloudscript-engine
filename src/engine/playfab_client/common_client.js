"use stritc";

const needle = require("needle");
const HTTP_METHOD = "POST";

module.exports = title => headers => {
    const forward_url = `https://${title}.playfabapi.com`;
    return (path, payload) => {
        const options = {
            headers,
            json: true,
            rejectUnauthorized: false
        };

        return needle(HTTP_METHOD, forward_url + path, payload, options);
    };
};

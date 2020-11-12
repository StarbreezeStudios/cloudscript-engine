"use strict";

const assert = require("assert");
const fs = require("fs");
const needle = require("needle");
const credentials = require("../credentials.json");

const HTTP_METHOD = "POST";

const title = process.argv[2];
assert(title, "No title provided");

const secret = credentials[title];
assert(secret, "No credentials found for title", title);

const file_path = process.argv[3];
assert(file_path, "No source file path provided");

const upload_url = `https://${title}.playfabapi.com/Admin/UpdateCloudScript`;

fs.readFile(file_path, (err, file_content) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    const payload = {
        "Files": [{
            "FileContents": file_content.toString(),
            "FileName": file_path
        }],
        "Publish": true
    };

    const headers = {
        "X-SecretKey": secret
    };

    const options = {
        headers,
        json: true
    };

    return needle(HTTP_METHOD, upload_url, payload, options)
        .then(res => {
            if(res.statusCode !== 200) {
                throw(res.body);
            }
            console.log(res.body);
        })
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
});

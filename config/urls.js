const urls = {
    apiBaseUrl: 'http://localhost:3001/api/v1',
    ajaxBaseUrl: 'http://localhost:3001/ajax',
    storeBaseUrl: 'http://localhost:3000',
};

if (process.env.APP_ENV === "production") {
    urls.apiBaseUrl = "https://cezerin.dev.i-zuev.space/api/v1";
    urls.ajaxBaseUrl = "https://cezerin.dev.i-zuev.space/ajax";
    urls.storeBaseUrl = "https://cezerin.dev.i-zuev.space";
}

module.exports.urls = urls;

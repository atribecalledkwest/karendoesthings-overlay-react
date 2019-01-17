module.exports = nodecg => {
    if(!nodecg.bundleConfig) {
        nodecg.log.error("No bundle config provided, please supply one to enable additional features.");
    }
    if(nodecg.bundleConfig.use.lastfm === true) {
        try {
            require("./lastfm")(nodecg);
        } catch(e) {
            nodecg.log.error("Caught error:", e);
            nodecg.log.error("Not loading LastFM library, will not get notifications about currently playing song.");
        }
    } else {
        nodecg.log.error("Not loading LastFM library, will not get notifications about currently playing song.");
    }
};

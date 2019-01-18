module.exports = nodecg => {
    if(Object.keys(nodecg.bundleConfig).length === 0) {
        nodecg.log.error("No bundle config provided, please supply one to enable additional features.");
        return;
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

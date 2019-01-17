(() => {
    "use strict";
    const LastFMNode = require("lastfm").LastFmNode;

    module.exports = nodecg => {
        if(typeof nodecg.bundleConfig.lastfm === "undefinied") {
            nodecg.log.error("`lastfm` not defined in the bundle config, LastFM module will be disabled.");
            return;
        }

        const lastfm = new LastFMNode({
            api_key: nodecg.bundleConfig.lastfm.apikey,
            secret: nodecg.bundleConfig.lastfm.sharedsecret
        });
        const trackstream = lastfm.stream(nodecg.bundleConfig.lastfm.target);

        let nprep = nodecg.Replicant("now-playing");

        trackstream.on("nowPlaying", track => {
            let nowplaying = {
                artist: track.artist["#text"],
                song: track.name,
                album: track.album["#text"] || track.artist["#text"],
                cover: track.image.pop()["#text"]
            };
            // Filter out non-nowplaying songs
            if(!track.hasOwnProperty("@attr") || !track["@attr"].hasOwnProperty("nowplaying") || track["@attr"].nowplaying !== "true") {
                return;
            }
            // Filters out potential duplicates
            if(nprep.value["song"] === nowplaying.song && nprep.value["artist"] === nowplaying.artist) {
                return;
            }
            nprep.value = nowplaying;
            nodecg.sendMessage("now-playing", nowplaying);
        });

        trackstream.on("error", e => {
            nodecg.log.error("Caught error:", e);
        });

        trackstream.start();
    };
})();

import React, {Component} from "react";
import ReactDOM from "react-dom";
import {TweenLite, TimelineLite, Bounce, Power4} from "gsap";

import "./now-playing.scss";

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        this.tl = new TimelineLite({ autoRemoveChildren: true });
        this.state = {
            artist: "N/A",
            song: "N/A"
        }
        this.titleElement = null;
        this.songElement = null;
        this.popup = this.popup.bind(this);
    }

    componentDidMount() {
        nodecg.readReplicant("now-playing", v => {
            this.setState(v);
        });
        this.tl.add([
            TweenLite.to(this.titleElement, 0.01, {
                x: "-100%",
                opacity: 0
            }),
            TweenLite.to(this.songElement, 0.01, {
                x: "-100%",
                opacity: 0
            })
        ]);
        nodecg.listenFor("now-playing", message => {
            this.popup(message.artist, message.song);
        })
    }

    popup(artist, song) {
        // Set out stuff in the TimelineLite so we don't get songs swapping mid-popup
        this.tl.add(() => {
            this.setState({
                artist,
                song
            })
        });

        // Turn on our elements and pop in
        this.tl.add([
            TweenLite.to(this.titleElement, 0.01, {
                opacity: 1
            }),
            TweenLite.to(this.songElement, 0.01, {
                opacity: 1
            })
        ]).add(TweenLite.to(this.titleElement, 1.15, {
            x: "0%",
            ease: Bounce.easeOut
        })).add(TweenLite.to(this.songElement, 1.15, {
                x: "0%",
                ease: Bounce.easeOut
        }), "-=0.4");

        // Wait
        if(!nodecg.bundleConfig.lastfm.hasOwnProperty("wait") || typeof nodecg.bundleConfig.lastfm.wait !== "number") {
            this.tl.add(TweenLite.to({}, 5.5, {}));
        } else {
            this.tl.add(TweenLite.to({}, nodecg.bundleConfig.lastfm.wait, {}));
        }

        // Slide out and turn off our elements
        this.tl.add(TweenLite.to(this.songElement, 1.15, {
            x: "-100%",
            ease: Power4.easeInOut
        })).add(TweenLite.to(this.titleElement, 1.15, {
            x: "-100%",
            ease: Power4.easeInOut
        }), "-=0.775").add([
            TweenLite.to(this.titleElement, 0.01, { opacity: 0 }),
            TweenLite.to(this.songElement, 0.01, { opacity: 0 })
        ]);

        // Adds a buffer between now-playing events
        this.tl.add(TweenLite.to({}, 0.875, {}));
    }

    render() {
        return <div class="now-playing">
            <div class="now-playing-element title" ref={ div => this.titleElement = div }>Now Playing</div>
            <div class="now-playing-element song" ref={ div => this.songElement = div }>{this.state.artist} - {this.state.song}</div>
        </div>;
    }
}

ReactDOM.render(<NowPlaying />, document.querySelector("#now-playing"));

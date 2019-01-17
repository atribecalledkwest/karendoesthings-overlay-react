import React, {Component} from "react";
import ReactDOM from "react-dom";
import {TweenLite, TimelineLite} from "gsap";

import "./now-playing.scss";

class NowPlaying extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artist: "N/A",
			song: "N/A"
		}
		this.titleElement = null;
		this.songElement = null;
	}

	componentDidMount() {

	}

	render() {
		return <div class="now-playing">
			<div class="now-playing-element title" ref={ div => this.titleElement = div }>Now Playing</div>
			<div class="now-playing-element song" ref={ div => this.songElement = div }>{this.state.artist} - {this.state.song}</div>
		</div>;
	}
}
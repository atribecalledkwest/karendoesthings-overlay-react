import React, {Component} from "react";
import ReactDOM from "react-dom";
import {TweenLite, TimelineLite} from "gsap";

import "./overlay-text.scss";

class OverlayText extends Component {
    constructor(props) {
        super(props);
        this.rep = nodecg.Replicant("overlay-text", { defaultValue: "KarenDoesThings" });
        this.tl = new TimelineLite({ autoRemoveChildren: true });
        this.state = {
            text: "KarenDoesThings"
        };
        this.textElement = null;
        this.textBorderElement = null;
    }

    componentDidMount() {
        this.rep.on("change", newValue => {
            this.tl.add([
                TweenLite.to(this.textElement, 0.5, { opacity: 0 }),
                TweenLite.to(this.textBorderElement, 0.5, { opacity: 0 })
            ]).add(() => {
                this.setState({
                    text: newValue
                });
            }).add([
                TweenLite.to(this.textElement, 0.5, { opacity: 1 }),
                TweenLite.to(this.textBorderElement, 0.5, { opacity: 1 })
            ]);
        })
    }

    render() {
        return <div class="overlay-text">
            <span class="fixed-text" ref={ sp => this.textElement = sp }>{this.state.text}</span>
            <span class="fixed-text border" ref={ sp => this.textBorderElement = sp }>{this.state.text}</span>
        </div>;
    }
}

ReactDOM.render(<OverlayText />, document.querySelector("#overlay-text"));

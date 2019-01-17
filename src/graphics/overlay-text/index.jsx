"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";

import "./overlay-text.scss";

class OverlayText extends Component {
    constructor() {
        super();
        this.rep = nodecg.Replicant("overlay-text", { defaultValue: "KarenDoesThings" });
        this.state = "KarenDoesThings";
    }

    componentDidMount() {
        this.rep.on("change", newValue => {
            this.setState(newValue);
        })
    }

    render() {
        return <span>{this.state}</span>;
    }
}

ReactDOM.render(<OverlayText />, document.querySelector("#root"));

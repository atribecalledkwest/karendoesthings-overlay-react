import React, {Component} from "react";
import ReactDOM from "react-dom";

import "./overlay-text.scss";

class OverlayText extends Component {
    constructor() {
        super();
        this.rep = nodecg.Replicant("overlay-text", { defaultValue: "KarenDoesThings" });
        this.state = {
            text: "KarenDoesThings"
        };
    }

    componentDidMount() {
        this.rep.on("change", newValue => {
            this.setState({
                text: newValue
            });
        })
    }

    render() {
        return <div class="overlay-text">
            <span class="fixed-text">{this.state.text}</span>
            <span class="fixed-text border">{this.state.text}</span>
        </div>;
    }
}

ReactDOM.render(<OverlayText />, document.querySelector("#overlay-text"));

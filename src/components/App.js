import React from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      renderBall: false,
      isBallReached: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.ArrowDownHandler = this.ArrowDownHandler.bind(this);
    this.timmer = this.timmer.bind(this);
  }

  handleClick() {
    // console.log("Start Button Clicked");
    var interval = window.setInterval(this.timmer, 1000);

    this.setState({
      renderBall: true
    });
  }

  ArrowDownHandler(e) {
    switch (e.key) {
      case "ArrowRight":
        this.setState({
          x: this.state.x + 5,
          y: this.state.y + 0
        });
        break;

      case "ArrowDown":
        this.setState({
          x: this.state.x + 0,
          y: this.state.y + 5
        });

        break;

      case "ArrowLeft":
        this.setState({
          x: this.state.x - 5,
          y: this.state.y + 0
        });
        break;

      case "ArrowUp":
        this.setState({
          x: this.state.x + 0,
          y: this.state.y - 5
        });
        break;

      default:
        break;
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.ArrowDownHandler);

    if (this.state.x === 250 && this.state.y === 250) {
      console.log("I AM FROM IF");
      window.clearInterval(interval);
    }
  }

  componentWillUnmount() {
    this.setState({
      time: 0
      // renderBall: false,
    });
  }

  timmer() {
    if (this.state.x !== 250 && this.state.y !== 250) {
      this.setState({
        time: this.state.time + 1
      });
    } else {
      this.setState({
        isBallReached: true
      });
      window.removeEventListener("keydown", this.ArrowDownHandler);
    }
  }

  render() {
    return (
      <>
        <div
          className="ball"
          style={{ left: this.state.x + "px", top: this.state.y + "px" }}
        ></div>
        <div className="hole"></div>
        <h1 className="heading-timer">{this.state.time}</h1>
        <h1
          className="msg"
          style={{
            position: "relative",
            textTransform: "uppercase",
            left: "40%",
            top: "100px"
          }}
        >
          {this.state.isBallReached === true
            ? `Game Ends in ${this.state.time} sec.`
            : null}
        </h1>
        <button className="start" onClick={this.handleClick}>
          Start
        </button>
      </>
    );
  }
}

export default Timer;

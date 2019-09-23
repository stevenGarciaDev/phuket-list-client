import React, { 
  Component 
} from 'react';

class CircularProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const sqSize = this.props.sqSize;
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    var dashOffset = dashArray - dashArray * this.props.percentage / 100;
    if (!(dashOffset >=0 || dashOffset >= 100)) {
      dashOffset = 0;
    }

    return (
      <svg
          width={this.props.sqSize}
          height={this.props.sqSize}
          viewBox={viewBox}>
          <circle
            className="circle-background"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`} />
          <circle
            className="circle-progress"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} />
          <text
            className="circle-text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${this.props.percentage}%`}
          </text>
           <text
            className="circle-text-small"
            x="50%"
            y="65%"
            dy=".3em"
            textAnchor="middle">
            {`Completed`}
          </text>
      </svg>
    );
  }
}

export default CircularProgressBar;
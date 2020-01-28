/*
 * https://github.com/bartgryszko/react-native-circular-slider
 * Slight modifications to make parameter naming clearer
 */
import React, { PureComponent } from "react"
import { PanResponder, View } from "react-native"
import Svg, { Circle, G, LinearGradient, Path, Defs, Stop } from "react-native-svg"
import range from "lodash.range"
import PropTypes from "prop-types" // ES6
import { ClockFace } from "../../components"
import { calculateArcColor, calculateArcCircle, getGradientId } from "../../utils/clock-slider"

export class ClockSlider extends PureComponent {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    angleStart: PropTypes.number.isRequired,
    angleLength: PropTypes.number.isRequired,
    gradientColorSegments: PropTypes.number,
    trackWidth: PropTypes.number,
    radius: PropTypes.number,
    gradientColorFrom: PropTypes.string,
    gradientColorTo: PropTypes.string,
    showClockFace: PropTypes.bool,
    clockFaceColor: PropTypes.string,
    trackColor: PropTypes.string,
    handleStopIcon: PropTypes.element,
    handleStartIcon: PropTypes.element,
  }

  static defaultProps = {
    gradientColorSegments: 5,
    trackWidth: 40,
    radius: 145,
    gradientColorFrom: "#ff9800",
    gradientColorTo: "#ffcf00",
    clockFaceColor: "#9d9d9d",
    trackColor: "#171717",
  }

  state = {
    circleCenterX: false,
    circleCenterY: false,
  }

  UNSAFE_componentWillMount() {
    this._sleepPanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => this.setCircleCenter(),
      onPanResponderMove: (evt, { moveX, moveY }) => {
        const { circleCenterX, circleCenterY } = this.state
        const { angleLength, angleStart, onUpdate } = this.props

        const currentAngleStop = (angleStart + angleLength) % (2 * Math.PI)
        let newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2

        if (newAngle < 0) {
          newAngle += 2 * Math.PI
        }

        let newAngleLength = currentAngleStop - newAngle

        if (newAngleLength < 0) {
          newAngleLength += 2 * Math.PI
        }

        onUpdate({
          angleStart: newAngle,
          angleLength: newAngleLength % (2 * Math.PI),
        })
      },
    })

    this._wakePanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => this.setCircleCenter(),
      onPanResponderMove: (evt, { moveX, moveY }) => {
        const { circleCenterX, circleCenterY } = this.state
        const { angleLength, angleStart, onUpdate } = this.props

        const newAngle = Math.atan2(moveY - circleCenterY, moveX - circleCenterX) + Math.PI / 2
        let newAngleLength = (newAngle - angleStart) % (2 * Math.PI)

        if (newAngleLength < 0) {
          newAngleLength += 2 * Math.PI
        }

        onUpdate({ angleStart, angleLength: newAngleLength })
      },
    })
  }

  onLayout = () => {
    this.setCircleCenter()
  }

  setCircleCenter = () => {
    this._circle.measure((x, y, w, h, px, py) => {
      const halfOfContainer = this.getContainerWidth() / 2
      this.setState({
        circleCenterX: px + halfOfContainer,
        circleCenterY: py + halfOfContainer,
      })
    })
  }

  getContainerWidth() {
    const { trackWidth, radius } = this.props
    return trackWidth + radius * 2 + 2
  }

  render() {
    const {
      angleStart,
      angleLength,
      gradientColorSegments,
      trackWidth,
      radius,
      gradientColorFrom,
      gradientColorTo,
      trackColor,
      showClockFace,
      clockFaceColor,
      handleStartIcon,
      handleStopIcon,
    } = this.props

    const containerWidth = this.getContainerWidth()

    const start = calculateArcCircle(0, gradientColorSegments, radius, angleStart, angleLength)
    const stop = calculateArcCircle(
      gradientColorSegments - 1,
      gradientColorSegments,
      radius,
      angleStart,
      angleLength,
    )

    return (
      <View style={{ width: containerWidth, height: containerWidth }} onLayout={this.onLayout}>
        <Svg height={containerWidth} width={containerWidth} ref={circle => (this._circle = circle)}>
          <Defs>
            {range(gradientColorSegments).map(i => {
              const { fromX, fromY, toX, toY } = calculateArcCircle(
                i,
                gradientColorSegments,
                radius,
                angleStart,
                angleLength,
              )
              const { fromColor, toColor } = calculateArcColor(
                i,
                gradientColorSegments,
                gradientColorFrom,
                gradientColorTo,
              )
              return (
                <LinearGradient
                  key={i}
                  id={getGradientId(i)}
                  x1={fromX.toFixed(2)}
                  y1={fromY.toFixed(2)}
                  x2={toX.toFixed(2)}
                  y2={toY.toFixed(2)}
                >
                  <Stop offset="0%" stopColor={fromColor} />
                  <Stop offset="1" stopColor={toColor} />
                </LinearGradient>
              )
            })}
          </Defs>

          {/*
            ##### Circle
          */}

          <G
            transform={{
              translate: `${trackWidth / 2 + radius + 1}, ${trackWidth / 2 + radius + 1}`,
            }}
          >
            <Circle r={radius} strokeWidth={trackWidth} fill="transparent" stroke={trackColor} />
            {showClockFace && <ClockFace r={radius - trackWidth / 2} stroke={clockFaceColor} />}
            {range(gradientColorSegments).map(i => {
              const { fromX, fromY, toX, toY } = calculateArcCircle(
                i,
                gradientColorSegments,
                radius,
                angleStart,
                angleLength,
              )
              const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(
                2,
              )} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(2)}`

              return (
                <Path
                  d={d}
                  key={i}
                  strokeWidth={trackWidth}
                  stroke={`url(#${getGradientId(i)})`}
                  fill="transparent"
                />
              )
            })}

            {/*
              ##### Stop Icon
            */}

            <G
              fill={gradientColorTo}
              transform={{ translate: `${stop.toX}, ${stop.toY}` }}
              onPressIn={() => this.setState({ angleLength: angleLength + Math.PI / 2 })}
              {...this._wakePanResponder.panHandlers}
            >
              <Circle
                r={(trackWidth - 1) / 2}
                fill={trackColor}
                stroke={gradientColorTo}
                strokeWidth="1"
              />
              {handleStopIcon}
            </G>

            {/*
              ##### Start Icon
            */}

            <G
              fill={gradientColorFrom}
              transform={{ translate: `${start.fromX}, ${start.fromY}` }}
              onPressIn={() =>
                this.setState({
                  angleStart: angleStart - Math.PI / 2,
                  angleLength: angleLength + Math.PI / 2,
                })
              }
              {...this._sleepPanResponder.panHandlers}
            >
              <Circle
                r={(trackWidth - 1) / 2}
                fill={trackColor}
                stroke={gradientColorFrom}
                strokeWidth="1"
              />
              {handleStartIcon}
            </G>
          </G>
        </Svg>
      </View>
    )
  }
}

import Style from './style.css'
import Actions from 'cms/actions'
import { Input } from 'cms/components'
import cx from 'classnames'
import range from 'lodash.range'
import {Motion, spring} from 'react-motion';

const clamp = (n, min, max) => Math.max(Math.min(n, max), min)
const springConfig = { stiffness: 300, damping: 50 };
const reinsert = (arr, from, to) => {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

class Post extends React.Component {
  render() {
    const { index, post: {
      title, created, type, desc, src, body
    }, isPressed } = this.props

    return (<div className={cx(Style.post, { [Style.noClick]: isPressed })}>
      <span className={Style.title}>{index}</span>
      <span className={Style.title}>{title}</span>
      <span className={Style.title}>Created on: {created}</span>
      {(() => {
        switch(type) {
          case 'image': return <img {...{src}} className={Style.item}/>
          case 'video': return <video {...{src}} className={Style.item}/>
          default: return <Input action={Actions.setPostField} {...{src}} value={body} style={Style.item}/>
        }
      })()}
      <span className={Style.description}>{desc}</span>
    </div>)
  }
}


export default class Container extends React.Component {

  constructor() {
    super()
    this.state = {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      order: range(100),
      count: 0
    }
  }

  componentDidMount() {
    // console.log(this.refs.test)
    const { value } = this.props
    this.setState({ order: range(value.length), count: value.length})
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }


  getStyle = i => {
    const {mouse, isPressed, lastPressed, order} = this.state;
    return lastPressed === i && isPressed
      ? {
          // pointer: 'none',
          scale: spring(1.1, springConfig),
          shadow: spring(16, springConfig),
          y: mouse,
        }
      : {
          // pointer: 'all',
          scale: spring(1, springConfig),
          shadow: spring(1, springConfig),
          y: spring(order.indexOf(i) * 320, springConfig),
        };
  }

  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  }

  handleTouchMove = e => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  handleMouseDown = (pos, pressY, {pageY}) => {
    this.setState({
      delta: pageY - pressY,
      mouse: pressY,
      isPressed: true,
      lastPressed: pos,
    });
  }

  handleMouseMove = ({ pageY }) => {
    // console.log(this.myTextInput.getBoundingClientRect())
    const {isPressed, delta, order, lastPressed, count } = this.state;
    if (isPressed) {
      const mouse = pageY - delta;
      const row = clamp(Math.round(mouse / 320), 0, count - 1);
      const newOrder = reinsert(order, order.indexOf(lastPressed), row);
      this.setState({mouse: mouse, order: newOrder});
    }
  }

  handleMouseUp = () => {
    this.setState({isPressed: false, delta: 0});
  }

  render() {
    const { title, value } = this.props
    // const { posts } = this.state
    const {mouse, isPressed, lastPressed, order} = this.state;

    return (
      <div className={Style.container}>
        <span className={Style.title}>{title}</span>
        <div onClick={() => Actions.addPost()}> + new post </div>


        {value.map((post, i) => {
          return (
            <Motion style={this.getStyle(i)} key={i}>
              {({scale, shadow, y, pointer }) =>
                <div
                  ref={(ref) => this.myTextInput = ref}
                  onMouseDown={this.handleMouseDown.bind(null, i, y)}
                  onTouchStart={this.handleTouchStart.bind(null, i, y)}
                  style={{
                    pointerEvents: pointer,
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === lastPressed ? 99 : i,
                  }}>
                  <Post {...{post, isPressed, index: order.indexOf(i) + 1}}/>
                </div>
              }
            </Motion>
          );
        })}
      </div>
    )
  }
}

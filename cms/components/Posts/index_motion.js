import Style from './style.css'
import Actions from 'cms/actions'
import { Input } from 'cms/components'
import update from 'react/lib/update';
import cx from 'classnames'

import HTML5Backend from 'react-dnd-html5-backend';

import { DragSource, DragDropContext, DropTarget } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) return;
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
    props.moveCard(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};


@DropTarget('CARD', cardTarget, connect => ({ connectDropTarget: connect.dropTarget() }))
@DragSource('CARD', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  monitor: monitor
}))
class Post extends React.Component {
  render() {
    const { index, value, isDragging, connectDragSource, connectDropTarget,
      post: { title, created, type, desc, src, body } } = this.props

    console.log(body)

    return connectDragSource(connectDropTarget(
      <div className={cx(Style.post, { [Style.isDragging]: isDragging })}>
        <span className={Style.title}>{index+1}</span>
        <span className={Style.title}>{title}</span>
        <span className={Style.title}>Created on: {created}</span>
        {(() => {
          switch(type) {
            case 'image': return <img {...{src}} className={Style.item}/>
            case 'video': return <video {...{src}} className={Style.item}/>
            default: return <Input {...{src}} action={Actions.setPostField} postIndex={index} title={'body'} value={body} style={Style.item}/>
          }
        })()}
        <span className={Style.description}>{desc}</span>
    </div>))
  }
}


@DragDropContext(HTML5Backend)
export default class Container extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      posts: props.value
    }
  }

  moveCard = (from, to) => {
    const { posts } = this.state
    const { index } = this.props
    const drag = posts[from];
    this.setState(update(this.state, {
      posts: {
        $splice: [
          [from, 1],
          [to, 0, drag]
        ]
      }
    }));
    Actions.reorderPosts({ posts: this.state.posts, index })

  }
  render() {
    const { title, posts } = this.state
    return (
      <div className={Style.container}>
        <span className={Style.title}>{title}</span>
        {posts.map((post, index) =>
          <Post
            key={index}
            moveCard={this.moveCard}
            {...{post, index}}
          />)
        }
        <div onClick={() => Actions.addPost()}> + new post </div>
      </div>
    )
  }
}

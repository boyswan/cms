import Style from './style.css'
import Actions from 'cms/actions'
import { Input, Image } from 'cms/components'
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

@DragDropContext(HTML5Backend)
export default class Container extends React.Component {
  render() {
    const { posts, pageIndex = 1 } = this.props

    const singlePost = posts.map((post, index) =>
      <Post key={index} moveCard={(from, to) => Actions.reorderPosts({ pageIndex, from, to })} {...{ pageIndex, post, index}} />
    )

    return (
      <div className={Style.container}>
        <span className={Style.title}>Posts</span>
        {singlePost}
        <div onClick={() => Actions.addPost()}> + new post </div>
      </div>
    )
  }
}


@DropTarget('CARD', cardTarget, connect => ({ connectDropTarget: connect.dropTarget() }))
@DragSource('CARD', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  monitor: monitor
}))
class Post extends React.Component {
  render() {
    const { index, pageIndex, isDragging, connectDragSource, connectDropTarget, post } = this.props
    return connectDragSource(connectDropTarget(
      <div className={cx(Style.post, { [Style.isDragging]: isDragging })}>
        <span className={Style.title}>{index+1}</span>
        <span className={Style.title}>{post.title}</span>
        <span className={Style.title}>Created on: {post.created}</span>
        {(() => {
          switch(post.type) {
            case 'image': return <div>
              <Image
                id={post.id}
                src={post.src}
                postIndex={index}
                pageIndex={pageIndex}
                title={'src'}
                className={Style.item}/>
                <span className={Style.description}>{post.body}</span>
              </div>
            case 'video': return <video
              src={post.src}
              className={Style.item}/>
            default: return <Input
              action={Actions.setPostField}
              postIndex={index}
              pageIndex={pageIndex}
              title={'body'}
              value={post.body}
              style={Style.item}/>
          }
        })()}
    </div>))
  }
}

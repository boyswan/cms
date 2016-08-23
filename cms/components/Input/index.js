import Style from './style.css'
import Actions from 'cms/actions'

export default ({
  action,
  style = Style.field,
  pageIndex,
  postIndex,
  title = '',
  value = ''
}) => (console.log(),
  <div className={Style.container}>
    <span className={Style.title}>{title}</span>
    <input
      className={style}
      type='text'
      value={value}
      onChange={e => {

        return action({ pageIndex, title, postIndex, value: e.target.value })
      }}/>
  </div>
)

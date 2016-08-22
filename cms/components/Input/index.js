import Style from './style.css'
import Actions from 'cms/actions'

export default ({
  action,
  style = Style.field,
  name = '',
  index = 0,
  postIndex = 0,
  title = '',
  value = ''
}) => (console.log(title, index, postIndex),
  <div className={Style.container}>
    <span className={Style.title}>{title}</span>
    <input
      className={style}
      type='text'
      value={value}
      onChange={e => action({ name, index, title, value: e.target.value })}/>
  </div>
)

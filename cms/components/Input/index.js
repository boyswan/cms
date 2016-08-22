import Style from './style.css'
import Actions from 'cms/actions'

export default ({
  action,
  style = Style.field,
  name = '',
  index = 0,
  postIndex = null,
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
        console.log(e.target.value)
        return action({ name, index, title, postIndex, value: e.target.value })
      }}/>
  </div>
)

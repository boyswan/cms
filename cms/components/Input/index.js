import Style from './style.css'
import Actions from 'cms/actions'

export default ({
  style = Style.field,
  name = '',
  index = 0,
  title = '',
  value = ''
}) => (console.log(),
  <div className={Style.container}>
    <span className={Style.title}>{title}</span>
    <input className={style} type='text' value={value} onChange={e => Actions.setField({ name, index, title, value: e.target.value })}/>
  </div>
)

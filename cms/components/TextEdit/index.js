import Style from './style.css'
import Actions from 'cms/actions'

export default ({ name, index, title, value }) => (console.log(),
  <div className={Style.container}>
    <span className={Style.title}>{title}</span>
    <input className={Style.field} type='text' value={value} onChange={e => Actions.setField({ name, index, title, value: e.target.value })}/>
  </div>
)

import Styles from './style.css'
import Actions from 'cms/actions'

export default ({ api }) => (console.log(),
  <div className={Styles.container}>
    <div onClick={() => Actions.saveData()}>Save !!!!!</div>
  </div>
)

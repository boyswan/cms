// import 'cms/index.html'
import Actions from 'cms/actions'
import speechRecognition from 'cms/helpers/speechRecognition'


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      text: 'default text', color: '', fontSize: 18
    }
  }

  componentDidMount() {
    this.setUpSpeech()
  }


  setUpSpeech() {
    speechRecognition(text => {
      let equals = str => text === str
      let contains = str => text.includes(str)
      let textSize = () => text.split(' ')[2]

      switch(true) {
        case contains('text size'): return this.setState({ fontSize: textSize(text) })
        case equals('red'): return this.setState({ color: 'red' })
        case equals('orange'): return this.setState({ color: 'orange' })
        default: return this.setState({ text })
      }
    })
  }

  render() {
    return (
      <div style={{color: this.state.color, fontSize: `${this.state.fontSize}px` }}> cms here</div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'))

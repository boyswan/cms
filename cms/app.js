import 'cms/app.css'
import 'cms/index.html'
import { Router, Route, useRouterHistory } from 'react-router'
import { createHistory } from 'history'
import { Provider, connect } from 'react-redux';
import store from 'cms/helpers/store'
import Actions from 'cms/actions'
import speechRecognition from 'cms/helpers/speechRecognition'
import { Body, Home } from 'cms/views'
import { Nav, Save } from 'cms/components'

class App extends React.Component {

  componentDidMount() {
    Actions.hydrate()
  }

  render() {
    const { children, ui, api } = this.props
    return (
      <main>
        { api.cmsData.pages ? <Save cmsData={api.cmsData}/> : ''}
        { api.cmsData.pages ? <Nav pages={api.cmsData.pages}/> : ''}
        { React.cloneElement(children, this.props) }
      </main>
    )
  }
}

const Root = connect(state => ({
  ui: state.ui.toJS(),
  api: state.api.toJS()
}))(App)


ReactDOM.render(
  <Provider store={store}>
    <Router history={useRouterHistory(createHistory)()} onUpdate={() => window.scrollTo(0, 0)}>
  		<Route component={Root}>
  			<Route path="/" component={Home} />
        <Route path="/:page" component={Body} />
  		</Route>
  	</Router>
  </Provider>,
document.getElementById('app'))
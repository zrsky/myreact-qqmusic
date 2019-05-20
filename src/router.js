/*import React from 'react'
import App from './App'
import Admin from './admin'
import Login from './pages/login'
import LoginForm from './pages/form/login'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import noMatch from './components/noMatch'
import Common from './common.js'
import { HashRouter , Route , Switch } from 'react-router-dom'
import BasicTable from './pages/table/basicTable';
import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/detail';
import User from './pages/user'
import BikeMap from './pages/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Rich from './pages/rich'

export default class IRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
            <Route path="/login" component={Login}></Route>
            <Route  path="/admin" render={()=>
                <Admin>
                    <Switch>
                        <Route path="/admin/home" component={Home}></Route>
                        <Route path="/admin/ui/buttons" component={Buttons}></Route>
                        <Route path="/admin/ui/buttons" component={Buttons}></Route>
                        <Route path="/admin/form/login" component={LoginForm}></Route>
                        <Route path="/admin/table/basic" component={BasicTable}></Route>
                        <Route path="/admin/city" component={City}></Route>
                        <Route path="/admin/order" component={Order}></Route>
                        <Route path="/admin/user" component={User}></Route>
                        <Route path="/admin/bikeMap" component={BikeMap}></Route>
                        <Route path="/admin/charts/bar" component={Bar}></Route>
                        <Route path="/admin/charts/pie" component={Pie}></Route>
                        <Route path="/admin/rich" component={Rich}></Route>
                        <Route component={noMatch}></Route>
                    </Switch>
                </Admin>
            }></Route>
            <Route path="/common" render={()=>
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail}></Route>
              </Common>
          }></Route>
        </App>
      </HashRouter>
    )
  }
}*/


import React from 'react'
import App from './App'
import Admin from './admin'

import { HashRouter , Route , Switch} from 'react-router-dom'

import Recommend from './components/recommend/recommend'
import Singer from './components/singer/singer'
import Rank from './components/rank/rank'
import SingerDetail from './components/singer-detail/singer-detail'
import noMatch from './components/noMatch/noMatch'

export default class IRouter extends React.Component {
  render () {
    return (
      <HashRouter>
        <App>
            <Route path="/" render={()=>
                <Admin>
                    <Switch>
                        <Route path="/recommend" component={Recommend}></Route>
                        <Route path="/singer" render={()=>
                          <Singer>
                            <Route path="/singer/:id" component={SingerDetail}></Route>
                          </Singer>}></Route>
                        <Route path="/rank" component={Rank}></Route>
                        <Route component={noMatch}></Route>
                    </Switch>
                </Admin>
            }></Route>
        </App>
      </HashRouter>
    )
  }
}

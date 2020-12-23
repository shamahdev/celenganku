import Home from '../views/pages/home'
import Dashboard from '../views/pages/dashboard'
import Balance from '../views/pages/balance'
import Pay from '../views/pages/pay'
import About from '../views/pages/about'

const Routes = {
  '/': Home,
  '/dashboard': Dashboard,
  '/admin': Dashboard,
  '/admin/pay': Dashboard,
  '/admin/data': Dashboard,
  '/balance': Balance,
  '/pay': Pay,
  '/profile': About,
}

export default Routes

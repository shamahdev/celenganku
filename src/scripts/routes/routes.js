import Home from '../views/pages/home'
import Dashboard from '../views/pages/dashboard'
import AdminDashboard from '../views/pages/admin/dashboard'
import Balance from '../views/pages/balance'
import Pay from '../views/pages/pay'
import About from '../views/pages/about'
import Process from '../views/pages/admin/process'
import Users from '../views/pages/admin/users'

const Routes = {
  '/': Home,
  '/dashboard': Dashboard,
  '/admin': AdminDashboard,
  '/admin/pay': Process,
  '/admin/data': Users,
  '/balance': Balance,
  '/pay': Pay,
  '/profile': About,
}

export default Routes

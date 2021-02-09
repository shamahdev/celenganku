import Home from '../views/pages/home'
import Dashboard from '../views/pages/user/dashboard'
import Transaction from '../views/pages/user/transaction'
import Profile from '../views/pages/user/profile'
import Report from '../views/pages/user/report'
import AdminDashboard from '../views/pages/admin/dashboard'
import Process from '../views/pages/admin/process'
import Users from '../views/pages/admin/users'

const Routes = {
  login: Home,
  user: {
    '/': Dashboard,
    '/transaction': Transaction,
    '/report': Report,
    '/profile': Profile,
  },
  admin: {
    '/admin': AdminDashboard,
    '/admin/pay': Process,
    '/admin/data': Users,
  },
}

export default Routes

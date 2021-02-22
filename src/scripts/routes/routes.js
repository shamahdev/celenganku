import Home from '../views/pages/home'
import Dashboard from '../views/pages/user/dashboard'
import Transaction from '../views/pages/user/transaction'
import Profile from '../views/pages/user/profile'
import Report from '../views/pages/user/report'
import ReportPreview from '../views/pages/user/report-preview'
import Admin from '../views/pages/admin'
import DataReport from '../views/pages/admin/data-report'
import DataList from '../views/pages/admin/datalist'
import AdminDashboard from '../views/pages/admin/dashboard'

const Routes = {
  login: {
    '/': Home,
    '/admin': Admin,
  },
  user: {
    '/': Dashboard,
    '/transaction': Transaction,
    '/report': Report,
    '/report/:id': ReportPreview,
    '/profile': Profile,
  },
  admin: {
    '/': AdminDashboard,
    '/list': DataList,
    '/report/:id': DataReport,
  },
}

export default Routes

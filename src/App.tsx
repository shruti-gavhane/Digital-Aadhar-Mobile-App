import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Quiz from './pages/Quiz';
import ScamSimulator from './pages/ScamSimulator';
import ScamDetector from './pages/ScamDetector';
import Progress from './pages/Progress';
import Emergency from './pages/Emergency';
import UPITraining from './pages/UPITraining';
import GovtCategories from './pages/GovtCategories';
import SchemeList from './pages/SchemeList';
import SchemeDetail from './pages/SchemeDetail';
import SchemePractice from './pages/SchemePractice';
import SchemeSuccess from './pages/SchemeSuccess';

// 🔐 NEW PAGES
import Login from './pages/Login';
import Register from './pages/Register';

// Contexts
import { AppProvider } from './context/AppContext';
import { UserProvider } from './context/UserContext';

// Ionic CSS
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AppProvider>
      <UserProvider>

        <IonReactRouter>

          <IonRouterOutlet>

            {/* 🔐 AUTH PAGES */}
            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

            {/* 🏠 MAIN APP */}
            <Route exact path="/home">
              <Dashboard />
            </Route>

            <Route exact path="/learn">
              <Learn />
            </Route>

            <Route exact path="/quiz">
              <Quiz />
            </Route>

            <Route exact path="/simulator">
              <ScamSimulator />
            </Route>

            <Route exact path="/detector">
              <ScamDetector />
            </Route>

            <Route exact path="/progress">
              <Progress />
            </Route>

            <Route exact path="/emergency">
              <Emergency />
            </Route>

            <Route exact path="/upi">
              <UPITraining />
            </Route>

            {/* 🔁 DEFAULT → LOGIN */}
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>

            <Route exact path="/govt">
  <GovtCategories />
</Route>

<Route exact path="/govt/list">
  <SchemeList />
</Route>

<Route exact path="/govt/detail">
  <SchemeDetail />
</Route>

<Route exact path="/govt/practice">
  <SchemePractice />
</Route>
<Route exact path="/govt/success">
  <SchemeSuccess />
</Route>
          </IonRouterOutlet>

        </IonReactRouter>

      </UserProvider>
    </AppProvider>
  </IonApp>
);

export default App;
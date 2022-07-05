import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// Component custom
import Create from './componetns/Create';
import About from './componetns/About';
import Error from './componetns/Error';
import Footer from './componetns/Footer';
import Header from './componetns/Header';
import Main from './componetns/Main';
import Note from './componetns/Note';

function App() {
  return (
    <div className="main">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/create" component={Create} />
          <Route exact path="/note" component={Note} />
          <Route exact path="/note/:noteURL" component={Note} />
          <Route component={Error} />
        </Switch>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;

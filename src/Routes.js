import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from './components/ScrollToTop';
import Home from './screens/Home';
import Progress from './screens/Progress';

function Routes() {
	return (
		<Suspense fallback={null}>
			<Router>
				<ScrollToTop>
					<Switch>
						<Route path="/" exact component={Home} />
						<ProtectedRoute path="/progress" exact component={Progress} />
					</Switch>
				</ScrollToTop>
			</Router>
		</Suspense>
	);
}
export default Routes;

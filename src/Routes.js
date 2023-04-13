import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from './components/ScrollToTop';
import Home from './screens/Home';
import Payment from './screens/Payment';

function Routes() {
	return (
		<Suspense fallback={null}>
			<Router>
				<ScrollToTop>
					<Switch>
						<Route path="/" exact component={Home} />
						<ProtectedRoute path="/payment" exact component={Payment} />
					</Switch>
				</ScrollToTop>
			</Router>
		</Suspense>
	);
}
export default Routes;

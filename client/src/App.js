import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import Auth from '~/pages/Auth/Auth';

import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.authReducer.authData);
    console.log(user, 'xem ở đây nè');
    return (
        <>
            {!!user ? (
                <Router>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Routes>
                </Router>
            ) : (
                <Auth />
            )}
        </>
    );
}

export default App;

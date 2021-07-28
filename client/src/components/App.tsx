import PagesRouter from '../router/router';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <PagesRouter />
        </BrowserRouter>
    )
}
export default App
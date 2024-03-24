import { Route, Routes,  } from 'react-router-dom';
import NotFound from '../../Components/NotFound';
import Cadastro from '../Cadastro';
import Listagem from '../Listagem';

export default function MainDefault() {
    return (
        <div className="container mt-4">
            <Routes>
              <Route exact path="/" element={<Cadastro/>} />
              <Route exact path="/cadastro" element={<Cadastro />} />
              <Route exact path="/listagem" element={<Listagem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
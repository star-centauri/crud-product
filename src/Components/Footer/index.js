import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsGithub  } from "react-icons/bs";

import '../../App.css';

export default function Footer() {
    return (
        <footer className="fixed-bottom custom-footer">
            <Stack  className="mx-auto">
                <div className="p-2">Venha me conhecer :)</div>
                <div className="p-2">
                    <Link className='custom-icon-footer' to='https://www.linkedin.com/in/bruna-lima-32a697195/' target="_blank"> <BsLinkedin/> </Link>
                    <Link className='custom-icon-footer' to='https://github.com/star-centauri' target="_blank"> <BsGithub/> </Link>
                </div>
                <div className="p-2 custom-copyright">© 2024 Copyright: Bruna Lima</div>
            </Stack>
        </footer>
    );
}
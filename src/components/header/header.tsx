import { Link } from 'react-router-dom';
import LogoPic from '../../assets/Merlinie Logo.jpg';
import { useEffect, useState } from 'react';

export function Header({ title }: { title: string }) {
  const [viewState, setViewState] = useState({
    mobileView: false,
  });

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const { mobileView } = viewState;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 910 ? setViewState((prevState) => ({ ...prevState, mobileView: true })) : setViewState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  return (
    <div>
      {mobileView ? (
        <div className="header text-center pt-2 d-print-none row">
          <div className="col navigation">
            <div className="col" onClick={toggleHamburger}>
              <Hamburger isOpen={hamburgerOpen} />
            </div>
            <ul style={{ display: hamburgerOpen ? 'block' : 'none' }} className="mobile-nav">
              <li>
                <Link to="/" className={title === 'Home' ? 'active-page nav-link' : 'nav-link'}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/washington" className={title === 'Washington' ? 'active-page nav-link' : 'nav-link'}>
                  Washington
                </Link>
              </li>
              <li>
                <Link to="/australia" className={title === 'Australia' ? 'active-page nav-link' : 'nav-link'}>
                  Australia
                </Link>
              </li>
              <li>
                <Link to="/newzealand" className={title === 'New Zealand' ? 'active-page nav-link' : 'nav-link'}>
                  New Zealand
                </Link>
              </li>
              <li>
                <Link to="/coolstuff" className={title === 'Cool Stuff' ? 'active-page nav-link' : 'nav-link'}>
                  Cool Stuff
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h2 className="page-title">KB the Cool Kid</h2>
          </div>
        </div>
      ) : (
        <div className="header text-center pt-2 d-print-none">
          <img src={LogoPic} height="80px" width="80px" className="rounded logo m-3 mt-2" alt="Merlinie Logo" />
          <h2 className="page-title">Katelyn Bowers the Cool Kid</h2>
          <div className="nav-bar d-flex justify-content-evenly">
            <div>
              <Link to="/" className={title === 'Home' ? 'active-page nav-link' : 'nav-link'}>
                Home
              </Link>
            </div>
            <div>
              <Link to="/washington" className={title === 'Washington' ? 'active-page nav-link' : 'nav-link'}>
                Washington
              </Link>
            </div>
            <div>
              <Link to="/australia" className={title === 'Australia' ? 'active-page nav-link' : 'nav-link'}>
                Australia
              </Link>
            </div>
            <div>
              <Link to="/newzealand" className={title === 'New Zealand' ? 'active-page nav-link' : 'nav-link'}>
                New Zealand
              </Link>
            </div>
            <div>
              <Link to="/coolstuff" className={title === 'Cool Stuff' ? 'active-page nav-link' : 'nav-link'}>
                Cool Stuff
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Hamburger({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="hamburger ms-2">
      <div className="burger burger1" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }} />
      <div className="burger burger2" style={{ transform: isOpen ? 'translateX(100%)' : 'translateX(0)', opacity: isOpen ? 0 : 1 }} />
      <div className="burger burger3" style={{ transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)' }} />
    </div>
  );
}

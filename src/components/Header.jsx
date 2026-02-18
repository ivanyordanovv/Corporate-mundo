import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const isProfile = location.pathname === '/profile'

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        Corporate Mundo
      </Link>
      <nav className="header__nav">
        <Link
          to="/"
          className={`header__link ${!isProfile ? 'header__link--active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/profile"
          className={`header__link ${isProfile ? 'header__link--active' : ''}`}
        >
          My Profile
        </Link>
      </nav>
    </header>
  )
}

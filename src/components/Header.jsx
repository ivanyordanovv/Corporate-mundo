import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const path = location.pathname

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        Corporate Mundo
      </Link>
      <nav className="header__nav">
        <Link
          to="/"
          className={`header__link ${path === '/' ? 'header__link--active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/profile"
          className={`header__link ${path === '/profile' ? 'header__link--active' : ''}`}
        >
          My Profile
        </Link>
        <Link
          to="/subscription"
          className={`header__link ${path === '/subscription' ? 'header__link--active' : ''}`}
        >
          Subscription
        </Link>
      </nav>
    </header>
  )
}

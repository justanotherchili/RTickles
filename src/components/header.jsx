import { Link } from "react-router-dom";
import "../styles/header.css"

function Header() {
  return (
    <header>
      <Link to="/" className="header-link">
        <h1>RTickles</h1>
      </Link>
    </header>
  );
}

export default Header;

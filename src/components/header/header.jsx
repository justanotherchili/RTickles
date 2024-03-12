import { Link } from "react-router-dom";
import "./header.css"

function Header() {
  return (
    <>
      <Link to="/">
        <h1>RTickles</h1>
      </Link>
    </>
  );
}

export default Header;

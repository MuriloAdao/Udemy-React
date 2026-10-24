
import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const mercadoAtivo = location.pathname.startsWith("/mercado/");

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        KURI<span>O</span>
      </NavLink>

      <nav className="navigation">
        <NavLink to="/" end>
          Início
        </NavLink>

        <NavLink
  to="/mercado"
  onClick={(event) => event.preventDefault()}
  className="mercado-link"
>
  Mercado
</NavLink>

        <NavLink to="/colecoes">
          Coleções
        </NavLink>

        <NavLink to="/sobre">
          Sobre
        </NavLink>
      </nav>

      <div className="header-actions">
        <button className="search-button">
          Pesquisar
        </button>

        <button className="wallet-button">
          Conectar
        </button>
      </div>
    </header>
  );
}

export default Header;

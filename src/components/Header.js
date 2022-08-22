import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../App.css'
import { Random } from "./Random";


export const Header = () => {
  const [modalShow, setModalShow] = useState(false);
  
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">Movie Night</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/">Watch List</Link>
            </li>
            <li>
              <Link to="/watched">Watched</Link>
            </li>
            <li>
              <Link to="/Random" className="btn_main" onClick={() => setModalShow(true)}>Random Movie Generator</Link>
            </li>
            <li>
              <Link to="/add" className="btn_main">
                + Add
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Random
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </header>
  );
};
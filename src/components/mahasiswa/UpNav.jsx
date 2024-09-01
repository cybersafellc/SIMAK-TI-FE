import { Badge, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function UpNav({ user }) {
  const handleNavigate = (url) => {
    window.location.href = url;
    return;
  };
  const handleLogout = () => {
    localStorage.removeItem("mhs_token");
    window.location.href = "/mahasiswa/login";
    return;
  };
  return (
    <header
      id="header"
      className="bg-white border-bottom border-light-subtle sticky-top bsb-tpl-header-sticky"
    >
      <nav
        className="navbar navbar-expand-md bsb-navbar-3 bsb-tpl-navbar-sticky"
        data-bsb-sticky-target="#header"
      >
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item me-3">
              <a
                className="nav-link"
                href="#!"
                data-bs-toggle="offcanvas"
                data-bs-target="#bsbSidebar1"
                aria-controls="bsbSidebar1"
              >
                <i className="bi-filter-left fs-3 lh-1" />
              </a>
            </li>
          </ul>
          <a className="navbar-brand d-flex gap-1 align-items-center" href="#">
            SIMAK TI
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#bsbNavbar"
            aria-controls="bsbNavbar"
            aria-label="Toggle Navigation"
          >
            <i className="bi bi-three-dots" />
          </button>
          <div className="collapse navbar-collapse" id="bsbNavbar">
            <ul className="navbar-nav bsb-dropdown-menu-responsive ms-auto align-items-center">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="position-relative">
                    <i className="bi bi-search" />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-md-end bsb-dropdown-animation bsb-fadeIn">
                  <form className="row g-1 px-3 py-2 align-items-center">
                    <div className="col-8">
                      <label
                        className="visually-hidden"
                        htmlFor="inputSearchNavbar"
                      >
                        Search
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputSearchNavbar"
                      />
                    </div>
                    <div className="col-4">
                      <button type="submit" className="btn btn-primary">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="position-relative">
                    <i className="bi bi-globe" />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-md-end bsb-dropdown-sm bsb-dropdown-animation bsb-fadeIn">
                  <div>
                    <h6 className="dropdown-header fs-7 text-center">
                      Pilih Bahasa
                    </h6>
                  </div>
                  <div>
                    <hr className="dropdown-divider mb-0" />
                  </div>
                  <div className="list-group list-group-flush">
                    <a
                      href="#!"
                      className="list-group-item list-group-item-action"
                      aria-current="true"
                    >
                      <div className="row g-0 align-items-center">
                        <div className="col-2">
                          <img
                            src="/assets/img/translation/indonesia.jpg"
                            className="img-fluid rounded-pill"
                            alt="French"
                          />
                        </div>
                        <div className="col-10">
                          <div className="ps-3">
                            <div className="fs-7">Indonesia</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div>
                    <hr className="dropdown-divider mt-0" />
                  </div>
                  <div>
                    <a className="dropdown-item fs-7 text-center" href="#!">
                      Bahasa Lainnya
                    </a>
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle bsb-dropdown-toggle-caret-disable"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/img/profile/profile-img-1.jpg"
                    width={35}
                    height={35}
                    className="img-fluid rounded-circle"
                    alt="Ethan Leo"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-md-end bsb-dropdown-animation bsb-fadeIn">
                  <li>
                    <h6 className="dropdown-header fs-7 text-center">
                      Welcome, {user?.nama}
                    </h6>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a href="#" className="dropdown-item" aria-current="true">
                      <div className="row g-0 align-items-center">
                        <div className="col-3">
                          <img
                            src="/assets/img/profile/profile-img-1.jpg"
                            width={55}
                            height={55}
                            className="img-fluid rounded-circle"
                            alt="Ethan Leo"
                          />
                        </div>
                        <div className="col-9">
                          <div className="ps-3">
                            <div className="text-secondary mt-1 fs-7">
                              Mahasiswa Account
                            </div>
                            <div className="text-secondary mt-1 fs-7">
                              {user?.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/mahasiswa">
                      <span>
                        <i className="bi bi-person-fill me-2" />
                        <span className="fs-7">View Profile</span>
                      </span>
                    </a>
                  </li>

                  <li>
                    <a className="dropdown-item" href="/mahasiswa">
                      <span>
                        <i className="bi bi-gear-fill me-2" />
                        <span className="fs-7">Settings &amp; Privacy</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <span>
                        <i className="bi bi-question-circle-fill me-2" />
                        <span className="fs-7">Help Center</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-center"
                      onClick={handleLogout}
                    >
                      <span>
                        <span className="fs-7">Log Out</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default UpNav;

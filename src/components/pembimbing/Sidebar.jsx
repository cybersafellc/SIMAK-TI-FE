import React from "react";
import { Accordion, Button, Modal, Nav, Offcanvas } from "react-bootstrap";
import { useCookies } from "react-cookie";

export default function Sidebar({ active, path }) {
  const [shows, setShows] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["mhs_token"]);
  const handleClose = () => setShows(false);
  const handleShow = () => setShows(true);

  const [show, setShow] = React.useState(false);

  const handleLogout = async () => {
    removeCookie("pmb_token");
    localStorage.removeItem("pmb_token");
    window.location.href = "/pembimbing/login";
    return;
  };
  return (
    <>
      <aside
        className="bsb-sidebar-1 offcanvas offcanvas-start"
        tabIndex={-1}
        id="bsbSidebar1"
        aria-labelledby="bsbSidebarLabel1"
      >
        <div className="offcanvas-header">
          <a
            className="sidebar-brand d-flex align-items-center gap-2 text-decoration-none text-black fw-bold"
            href="#"
          >
            <img
              src="/LOGO-UMRI-COLOR-ORI.webp"
              id="bsbSidebarLabel1"
              className="bsb-tpl-logo"
              alt="BootstrapBrain Logo"
            />
            SIMAK TI
          </a>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body pt-0 d-flex flex-column justify-content-between">
          <div>
            <hr className="sidebar-divider mb-3" />
            <ul className="navbar-nav">
              {/* penting */}
              <li className="nav-item">
                <a
                  className="nav-link p-3 "
                  data-bs-toggle="collapse"
                  href="#dashboardExamples"
                  role="button"
                  aria-expanded="true"
                  aria-controls="dashboardExamples"
                >
                  <div className="nav-link-icon text-success">
                    <i className="bi bi-grid" />
                  </div>
                  <span className="nav-link-text fw-bold">Dashboards</span>
                </a>
                <div className="collapse show" id="dashboardExamples">
                  <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                      <a
                        className={"nav-link text-secondary"}
                        aria-current="page"
                        href="/pembimbings"
                      >
                        <div className="nav-link-icon text-success-emphasis">
                          <i className="bi bi-arrow-right-short" />
                        </div>
                        <span className="nav-link-text">Home</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item mt-3">
                <h6 className="py-1 text-secondary text-uppercase fs-7">
                  KP & TA
                </h6>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link p-3 "
                  data-bs-toggle="collapse"
                  href="#dashboardExamples"
                  role="button"
                  aria-expanded="true"
                  aria-controls="dashboardExamples"
                >
                  <div className="nav-link-icon text-success">
                    <i class="bx bxs-group"></i>
                  </div>
                  <span className="nav-link-text fw-bold">Bimbingan</span>
                </a>
                <div className="collapse show" id="dashboardExamples">
                  <ul className="nav flex-column ms-4">
                    <li className="nav-item">
                      <a
                        className={"nav-link text-secondary"}
                        aria-current="page"
                        href="/pembimbings/kerja-praktek"
                      >
                        <div className="nav-link-icon text-success-emphasis">
                          <i className="bi bi-arrow-right-short" />
                        </div>
                        <span className="nav-link-text">Kerja Praktek</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={"nav-link text-secondary"}
                        aria-current="page"
                        href="/pembimbings/tugas-akhir"
                      >
                        <div className="nav-link-icon text-success-emphasis">
                          <i className="bi bi-arrow-right-short" />
                        </div>
                        <span className="nav-link-text">Tugas Akhir</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <hr className="sidebar-divider my-4" />
            <div>
              <Button
                className="bg-transparent border-success text-success w-100"
                onClick={handleShow}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      <Modal
        show={shows}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda Yakin Untuk Keluar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="success" onClick={handleLogout}>
            Keluar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

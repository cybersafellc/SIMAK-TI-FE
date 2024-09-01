import React from "react";

import FootersAuth from "../../components/FootersAuth";

import {
  Badge,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  getCountFiles,
  getCountKordinators,
  getCountMahasiswa,
  getCountPembimbing,
  getKP,
  getMahasiswa,
  getMahasiswaProfile,
  getTA,
} from "../../utils/all-utils";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/mahasiswa/SideBar";
import UpNav from "../../components/mahasiswa/UpNav";

export default function IndexMhs() {
  const [mahasiswa, setMahasiswa] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading

  // paket update Profile
  const [namaMahasiswa, setNamaMahasiswa] = React.useState("");
  const changeNamaMahasiswa = ({ target }) => setNamaMahasiswa(target.value);
  const [nimMahasiswa, setNimMahasiswa] = React.useState("");
  const changeNimMahasiswa = ({ target }) => setNimMahasiswa(target.value);
  const [noHpMahasiswa, setNoHpMahasiswa] = React.useState("");
  const changeNoHpMahasiswa = ({ target }) => setNoHpMahasiswa(target.value);
  const [emailMahasiswa, setEmailMahasiswa] = React.useState("");
  const changeEmailMahasiswa = ({ target }) => setEmailMahasiswa(target.value);
  const [paMahasiswa, setPaMahasiswa] = React.useState("");
  const changePaMahasiswa = ({ target }) => setPaMahasiswa(target.value);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    alert("Wleeeee Belum bisa");
  };

  // paket updatePassword
  const [currentPassword, setCurrentPassword] = React.useState("");
  const changeCurrentPassword = ({ target }) =>
    setCurrentPassword(target.value);
  const [newPassword, setNewPassword] = React.useState("");
  const changeNewPassword = ({ target }) => setNewPassword(target.value);
  const [ConfirmNewPassword, setConfirmNewPassword] = React.useState("");
  const changeConfirmNewPassword = ({ target }) =>
    setConfirmNewPassword(target.value);
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    alert("Wleeeee Belum bisa");
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("mhs_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/mahasiswa/login";
          return;
        }

        const [mahasiswaProfile] = await Promise.all([
          new Promise((resolve, reject) => {
            getMahasiswaProfile(accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setMahasiswa(mahasiswaProfile);
        if (mahasiswaProfile) {
          setNamaMahasiswa(mahasiswaProfile?.nama);
          setNimMahasiswa(mahasiswaProfile?.nim);
          setNoHpMahasiswa(mahasiswaProfile?.no_hp);
          setEmailMahasiswa(mahasiswaProfile?.email);
          setPaMahasiswa(mahasiswaProfile?.pembimbing_akademik);
        }
        console.log(mahasiswaProfile);
      } catch (err) {
        if (err.message == "tolong masukkan access_token valid") {
          // Unauthorized
          localStorage.removeItem("mhs_token");
          window.location.href = "/mahasiswa/login";
        } else {
          console.error("Error fetching data:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          <>
            <Helmet>
              <script
                src="/assets/controller/console-bsb.js"
                type="text/javascript"
              />
              <script
                src="/assets/controller/chart-1.js"
                type="text/javascript"
              />
              <script
                src="/assets/controller/chart-3.js"
                type="text/javascript"
              />
              <script
                src="/assets/controller/chart-4.js"
                type="text/javascript"
              />
            </Helmet>
            <UpNav user={mahasiswa} />
            <Sidebar />
            {/* Main */}
            <main id="main" className="min-vh-100 bg-light">
              {/* Section - Bootstrap Brain Component */}
              {/* Breadcrumb */}
              <section className="py-3 py-md-4 py-xl-5 bg-light">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="h4">Mahasiswa Dashboard</h1>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 fs-7">
                          <li className="breadcrumb-item">
                            <a
                              className="link-primary text-decoration-none"
                              href="index.html"
                            >
                              Home
                            </a>
                          </li>
                          <li className="breadcrumb-item"></li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </section>
              {/* Section - Bootstrap Brain Component */}
              <section className="pb-3 pb-md-4 pb-xl-5 bg-light">
                <div className="container">
                  <div className="row gy-4 gy-lg-0">
                    <div className="col-12 col-lg-4 col-xl-3">
                      <div className="row gy-4">
                        <div className="col-12">
                          <div className="card widget-card border-light shadow-sm">
                            <div className="card-header text-bg-success">
                              Selamat Datang, {mahasiswa?.nama}
                            </div>
                            <div className="card-body">
                              <div className="text-center mb-3">
                                <img
                                  src="/assets/img/profile/profile-img-1.jpg"
                                  className="img-fluid rounded-circle"
                                  alt="Luna John"
                                />
                              </div>
                              <h5 className="text-center mb-1">
                                {mahasiswa?.nama}
                              </h5>
                              <p className="text-center text-secondary mb-4">
                                Teknik Industri
                              </p>
                              <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <h6 className="m-0">Nim</h6>
                                  <span>{mahasiswa?.nim}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <h6 className="m-0">No Hp</h6>
                                  <span>{mahasiswa?.no_hp}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <h6 className="m-0">Email</h6>
                                  <span>{mahasiswa?.email}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-8 col-xl-9">
                      <div className="card widget-card border-light shadow-sm">
                        <div className="card-body p-4">
                          <ul
                            className="nav nav-tabs"
                            id="profileTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link active"
                                id="overview-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#overview-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="overview-tab-pane"
                                aria-selected="true"
                              >
                                Overview
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="profile-tab-pane"
                                aria-selected="false"
                              >
                                Update Profile
                              </button>
                            </li>

                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link"
                                id="password-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#password-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="password-tab-pane"
                                aria-selected="false"
                              >
                                Password
                              </button>
                            </li>
                          </ul>
                          <div
                            className="tab-content pt-4"
                            id="profileTabContent"
                          >
                            <div
                              className="tab-pane fade show active"
                              id="overview-tab-pane"
                              role="tabpanel"
                              aria-labelledby="overview-tab"
                              tabIndex={0}
                            >
                              <h5 className="mb-3">Profile</h5>
                              <div className="row g-0">
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Nama Lengkap</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">{mahasiswa?.nama}</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Pembimbing Akademik</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">
                                    {mahasiswa?.pembimbing_akademik}
                                  </div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Nim</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2"> {mahasiswa?.nim}</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Prodi</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">Teknik Industri</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Username</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">
                                    {mahasiswa?.username}
                                  </div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">No Hp</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">{mahasiswa?.no_hp}</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Email</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">{mahasiswa?.email}</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Status</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">
                                    <Badge className="bg-success">Active</Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="tab-pane fade"
                              id="profile-tab-pane"
                              role="tabpanel"
                              aria-labelledby="profile-tab"
                              tabIndex={0}
                            >
                              <form
                                onSubmit={handleUpdateProfile}
                                className="row gy-3 gy-xxl-4"
                              >
                                <div className="col-12">
                                  <label
                                    htmlFor="inputFirstName"
                                    className="form-label"
                                  >
                                    Nama Lengkap
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputFirstName"
                                    value={namaMahasiswa}
                                    onChange={changeNamaMahasiswa}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label
                                    htmlFor="inputEducation"
                                    className="form-label"
                                  >
                                    Nim
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputEducation"
                                    value={nimMahasiswa}
                                    onChange={changeNimMahasiswa}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label
                                    htmlFor="inputSkills"
                                    className="form-label"
                                  >
                                    No Hp
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputSkills"
                                    value={noHpMahasiswa}
                                    onChange={changeNoHpMahasiswa}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label
                                    htmlFor="inputJob"
                                    className="form-label"
                                  >
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="inputJob"
                                    value={emailMahasiswa}
                                    onChange={changeEmailMahasiswa}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label
                                    htmlFor="inputCompany"
                                    className="form-label"
                                  >
                                    Pembimbing Akademik
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputCompany"
                                    value={paMahasiswa}
                                    onChange={changePaMahasiswa}
                                  />
                                </div>
                                <div className="col-12">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </form>
                            </div>

                            <div
                              className="tab-pane fade"
                              id="password-tab-pane"
                              role="tabpanel"
                              aria-labelledby="password-tab"
                              tabIndex={0}
                            >
                              <form onSubmit={handleUpdatePassword}>
                                <div className="row gy-3 gy-xxl-4">
                                  <div className="col-12">
                                    <label
                                      htmlFor="currentPassword"
                                      className="form-label"
                                    >
                                      Current Password
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="currentPassword"
                                      value={currentPassword}
                                      onChange={changeCurrentPassword}
                                    />
                                  </div>
                                  <div className="col-12">
                                    <label
                                      htmlFor="newPassword"
                                      className="form-label"
                                    >
                                      New Password
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="newPassword"
                                      value={newPassword}
                                      onChange={changeNewPassword}
                                    />
                                  </div>
                                  <div className="col-12">
                                    <label
                                      htmlFor="confirmPassword"
                                      className="form-label"
                                    >
                                      Confirm Password
                                    </label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="confirmPassword"
                                      value={ConfirmNewPassword}
                                      onChange={changeConfirmNewPassword}
                                    />
                                  </div>
                                  <div className="col-12">
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                    >
                                      Change Password
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Aside */}

            {/* Footer */}
            <FootersAuth />
          </>
        </>
      )}
    </>
  );
}

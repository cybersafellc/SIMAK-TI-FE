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
  getKordinatorsProfile,
  getKP,
  getMahasiswa,
  getMahasiswaProfile,
  getPembimbingProfile,
  getTA,
  updateKordinatorsPassword,
  updateKordinatorsProfile,
  updatePembimbingPassword,
  updatePembimbingProfile,
} from "../../utils/all-utils";
import { Helmet } from "react-helmet";
import Message from "../../components/Message";
import UpNav from "../../components/UpNav";
import Sidebar from "../../components/Sidebar";

export default function ProfileSaye() {
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [pembimbing, setPembimbing] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading

  //   paket update profile
  const [namaPembimbing, setNamaPembimbing] = React.useState("");
  const changeNamaPembimbing = ({ target }) => setNamaPembimbing(target.value);
  const [nidnPembimbing, setNidnPembimbing] = React.useState("");
  const changeNidnPembimbing = ({ target }) => setNidnPembimbing(target.value);
  const [noHpPembimbing, setNohpPembimbing] = React.useState("");
  const changeNoHpPembimbing = ({ target }) => setNohpPembimbing(target.value);
  const [emailPmebimbing, setEmailPembimbing] = React.useState("");
  const changeEmailPembimbing = ({ target }) =>
    setEmailPembimbing(target.value);
  const [Jabatan, setjabatan] = React.useState("");
  const changeJabatan = ({ target }) => setjabatan(target.value);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const form = {
        nama: namaPembimbing,
        no_hp: noHpPembimbing,
        // nidn: nidnPembimbing,
        jabatan: Jabatan,
        email: emailPmebimbing,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          updateKordinatorsProfile(
            form,
            localStorage.getItem("access_token"),
            (err, data) => {
              if (err) reject(err);
              else resolve(data);
            }
          );
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Mengupdate Profile!");

        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
      }
      // Tangani error dengan lebih hati-hati, misalnya:

      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
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
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      if (newPassword !== ConfirmNewPassword) {
        throw new Error("New password dan Confirm Password tidak sama !");
      }
      const form = {
        curent_password: currentPassword,
        new_password: ConfirmNewPassword,
      };
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          updateKordinatorsPassword(
            form,
            localStorage.getItem("access_token"),
            (err, data) => {
              if (err) reject(err);
              else resolve(data);
            }
          );
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Mengupdate Password!");

        setView(true);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (err) {
      if (err.message === "tolong masukkan access_token valid") {
        localStorage.removeItem("access_token");
        window.location.href = "/kordinators/login";
      }
      // Tangani error dengan lebih hati-hati, misalnya:

      setError(true);
      setMessage(err.message);
      setView(true);
      setTimeout(() => {
        setView(false);
      }, 5000);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/kordinators/login";
          return;
        }

        const [pembimbingProfile] = await Promise.all([
          new Promise((resolve, reject) => {
            getKordinatorsProfile(accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setPembimbing(pembimbingProfile);
        if (pembimbingProfile) {
          setNamaPembimbing(pembimbingProfile?.nama);
          setNidnPembimbing(pembimbingProfile?.nidn);
          setNohpPembimbing(pembimbingProfile?.no_hp);
          setEmailPembimbing(pembimbingProfile?.email);
          setjabatan(pembimbingProfile?.jabatan);
        }
        console.log(pembimbingProfile);
      } catch (err) {
        // Tangani error dengan lebih hati-hati, misalnya:
        if (err.message !== "Failed to fetch") {
          // Unauthorized
          localStorage.removeItem("access_token");
          window.location.href = "/kordinators/login";
        } else {
          console.error("Error fetching data:", err);
          // Tampilkan pesan error kepada pengguna atau lakukan tindakan lain yang sesuai
        }
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };
    fetchData();
  }, []); // useEffect tetap berjalan sekali saja
  return (
    <>
      {" "}
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          <>
            <Message
              view={view}
              error={error}
              pesan={message}
              onClose={() => setView(false)}
            />
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
            <UpNav user={pembimbing} />
            <Sidebar />
            {/* Main */}
            <main id="main">
              {/* Section - Bootstrap Brain Component */}
              {/* Breadcrumb */}
              <section className="py-3 py-md-4 py-xl-5 bg-light">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="h4">Kordinators Profile</h1>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 fs-7">
                          <li className="breadcrumb-item">
                            <a
                              className="link-primary text-decoration-none"
                              href="/kordinators"
                            >
                              Home
                            </a>
                          </li>

                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            Profile
                          </li>
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
                              Selamat Datang, {pembimbing?.nama}
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
                                {pembimbing?.nama}
                              </h5>
                              <p className="text-center text-secondary mb-4">
                                Dosen Teknik Industri
                              </p>
                              <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <h6 className="m-0">Nidn</h6>
                                  <span>{pembimbing?.nidn}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <h6 className="m-0">No Hp</h6>
                                  <span>{pembimbing?.no_hp}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                  <h6 className="m-0">Email</h6>
                                  <span>{pembimbing?.email}</span>
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
                                  <div className="p-2">{pembimbing?.nama}</div>
                                </div>

                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Nidn</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2"> {pembimbing?.nidn}</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Jabatan</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">
                                    {" "}
                                    {pembimbing?.jabatan}
                                  </div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Dosen Prodi</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">Teknik Industri</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Username</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">
                                    {pembimbing?.username}
                                  </div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">No Hp</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">{pembimbing?.no_hp}</div>
                                </div>
                                <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
                                  <div className="p-2">Email</div>
                                </div>
                                <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
                                  <div className="p-2">{pembimbing?.email}</div>
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
                                className="row gy-3 gy-xxl-4"
                                onSubmit={handleUpdateProfile}
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
                                    value={namaPembimbing}
                                    onChange={changeNamaPembimbing}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label
                                    htmlFor="inputEducation"
                                    className="form-label"
                                  >
                                    Nidn
                                  </label>
                                  <input
                                    disabled={true}
                                    type="text"
                                    className="form-control"
                                    id="inputEducation"
                                    value={nidnPembimbing}
                                    onChange={changeNidnPembimbing}
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
                                    value={noHpPembimbing}
                                    onChange={changeNoHpPembimbing}
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
                                    value={emailPmebimbing}
                                    onChange={changeEmailPembimbing}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label
                                    htmlFor="inputCompany"
                                    className="form-label"
                                  >
                                    Jabatan
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputCompany"
                                    value={Jabatan}
                                    onChange={changeJabatan}
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

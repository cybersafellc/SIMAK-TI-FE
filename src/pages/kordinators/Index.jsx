import React from "react";
import UpNav from "../../components/UpNav";
import FootersAuth from "../../components/FootersAuth";
import Sidebar from "../../components/Sidebar";
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
  getTA,
} from "../../utils/all-utils";
import { Helmet } from "react-helmet";

export default function Index() {
  const [kp, setKp] = React.useState([]);
  const [ta, setTa] = React.useState([]);
  const [countMahasiwa, setCountMahasiswa] = React.useState(0);
  const [countFiles, setCountFiles] = React.useState(0);
  const [countKordinators, setCountKordinators] = React.useState(0);
  const [countPembimbing, setCountPembimbing] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/kordinators/login";
          return;
        }

        const [
          kpData,
          taData,
          countFile,
          countMahasiwa,
          countKorinators,
          CountPembimbing,
        ] = await Promise.all([
          new Promise((resolve, reject) => {
            getKP(1, accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getTA(1, accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getCountFiles((err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getCountMahasiswa((err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getCountKordinators((err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getCountPembimbing((err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);

        setKp(kpData);
        setTa(taData);
        setCountFiles(countFile);
        setCountMahasiswa(countMahasiwa);
        setCountKordinators(countKorinators);
        setCountPembimbing(CountPembimbing);
      } catch (err) {
        if (err.message == "tolong masukkan access_token valid") {
          // Unauthorized
          localStorage.removeItem("access_token");
          window.location.href = "/kordinators/login";
        } else {
          console.error("Error fetching data:", err);
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
              <script
                src="/assets/controller/map-2.js"
                type="text/javascript"
              />
              <script
                src="/assets/controller/calendar-1.js"
                type="text/javascript"
              />
            </Helmet>
            <UpNav />
            <Sidebar path="/dashboards" />
            {/* Main */}
            <main id="main" className="min-vh-100">
              {/* Section - Bootstrap Brain Component */}
              {/* Breadcrumb */}
              <section className="py-3 py-md-4 py-xl-5 bg-light">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="h4">Kordinators Dashboard</h1>
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
                          ></li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
              </section>
              {/* Section - Bootstrap Brain Component */}
              {/* Card 1 - Bootstrap Brain Component */}
              <section className="pb-3 pb-md-4 pb-xl-5 bg-light">
                <div className="container">
                  <div className="row gy-3 gy-md-4">
                    <div className="col-12 col-sm-6 col-xl-3">
                      <div className="card widget-card border-light shadow-sm">
                        <div className="card-body p-4">
                          <div className="row">
                            <div className="col-8">
                              <h5 className="card-title widget-card-title mb-3">
                                Mahasiswa
                              </h5>
                              <h4 className="card-subtitle text-body-secondary m-0">
                                {countMahasiwa}
                              </h4>
                            </div>
                            <div className="col-4">
                              <div className="d-flex justify-content-end">
                                <div className="lh-1 text-white bg-success rounded-circle p-3 d-flex align-items-center justify-content-center">
                                  <i className="bi bi-person fs-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex align-items-center mt-3">
                                <span className="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                  <i className="bi bi-arrow-right-short bsb-rotate-n45" />
                                </span>
                                <div>
                                  <p className="fs-7 mb-0">+100%</p>
                                  <p className="fs-7 mb-0 text-secondary">
                                    since last years
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-3">
                      <div className="card widget-card border-light shadow-sm">
                        <div className="card-body p-4">
                          <div className="row">
                            <div className="col-8">
                              <h5 className="card-title widget-card-title mb-3">
                                Pembimbing
                              </h5>
                              <h4 className="card-subtitle text-body-secondary m-0">
                                {countPembimbing}
                              </h4>
                            </div>
                            <div className="col-4">
                              <div className="d-flex justify-content-end">
                                <div className="lh-1 text-white bg-success rounded-circle p-3 d-flex align-items-center justify-content-center">
                                  <i className="bi bi-person fs-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex align-items-center mt-3">
                                <span className="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                  <i className="bi bi-arrow-right-short bsb-rotate-n45" />
                                </span>
                                <div>
                                  <p className="fs-7 mb-0">+100%</p>
                                  <p className="fs-7 mb-0 text-secondary">
                                    since last years
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-3">
                      <div className="card widget-card border-light shadow-sm">
                        <div className="card-body p-4">
                          <div className="row">
                            <div className="col-8">
                              <h5 className="card-title widget-card-title mb-3">
                                Kordinator
                              </h5>
                              <h4 className="card-subtitle text-body-secondary m-0">
                                {countKordinators}
                              </h4>
                            </div>
                            <div className="col-4">
                              <div className="d-flex justify-content-end">
                                <div className="lh-1 text-white bg-success rounded-circle p-3 d-flex align-items-center justify-content-center">
                                  <i className="bi bi-person fs-4" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex align-items-center mt-3">
                                <span className="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                  <i className="bi bi-arrow-right-short bsb-rotate-n45" />
                                </span>
                                <div>
                                  <p className="fs-7 mb-0">+100%</p>
                                  <p className="fs-7 mb-0 text-secondary">
                                    since last years
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-xl-3">
                      <div className="card widget-card border-light shadow-sm">
                        <div className="card-body p-4">
                          <div className="row">
                            <div className="col-8">
                              <h5 className="card-title widget-card-title mb-3">
                                Berkas
                              </h5>
                              <h4 className="card-subtitle text-body-secondary m-0">
                                {countFiles}
                              </h4>
                            </div>
                            <div className="col-4">
                              <div className="d-flex justify-content-end">
                                <div className="lh-1 text-white bg-success primary rounded-circle p-3 d-flex align-items-center justify-content-center">
                                  <i class="bi-collection fs-4"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="d-flex align-items-center mt-3">
                                <span className="lh-1 me-3 bg-success-subtle text-success rounded-circle p-1 d-flex align-items-center justify-content-center">
                                  <i className="bi bi-arrow-right-short bsb-rotate-n45" />
                                </span>
                                <div>
                                  <p className="fs-7 mb-0">+100%</p>
                                  <p className="fs-7 mb-0 text-secondary">
                                    since last week
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Section - Bootstrap Brain Component */}
              <section className="pb-3 pb-md-4 pb-xl-5 bg-light">
                <div className="container">
                  <div className="row gy-3 gy-md-4">
                    <div className="col-12">
                      {/* Table 1 - Bootstrap Brain Component */}
                      <div className="card widget-card border-light shadow-sm h-100">
                        <div className="card-body p-4">
                          <h5 className="card-title widget-card-title mb-4">
                            Aktivitas Pengajuan KP
                          </h5>
                          <div className="table-responsive">
                            <table className="table table-borderless bsb-table-xl text-nowrap align-middle m-0">
                              <thead>
                                <tr>
                                  <th>Nim</th>
                                  <th>Nama</th>
                                  <th>Contact</th>
                                  <th>Tanggal</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {kp?.slice(0, 10).map((data, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <h6 className="mb-1">
                                          {data?.mahasiswa?.nim}
                                        </h6>
                                        <span className="text-secondary fs-7">
                                          Teknik Industri
                                        </span>
                                      </td>
                                      <td>
                                        <h6 className="mb-1">
                                          {data?.mahasiswa?.nama}
                                        </h6>
                                        <span className="text-secondary fs-7">
                                          Indonesia
                                        </span>
                                      </td>
                                      <td>
                                        <h6 className="mb-1">
                                          {data?.mahasiswa?.no_hp}
                                        </h6>
                                        <span className="text-secondary fs-7">
                                          {data?.mahasiswa?.email}
                                        </span>
                                      </td>
                                      <td>{`${new Date(
                                        data?.created_at
                                      ).getDate()}-${
                                        new Date(data?.created_at).getMonth() +
                                        1
                                      }-${new Date(
                                        data?.created_at
                                      ).getFullYear()}`}</td>
                                      <td>
                                        {data?.status === "ditolak" && (
                                          <span className="badge rounded-pill bg-danger">
                                            Ditolak
                                          </span>
                                        )}
                                        {data?.status === "diterima" && (
                                          <span className="badge rounded-pill bg-success">
                                            Disetujui
                                          </span>
                                        )}
                                        {data?.status === "menunggu" && (
                                          <span className="badge rounded-pill bg-warning">
                                            Menunggu
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                                {kp?.length < 1 ? (
                                  <tr>
                                    <td className="text-center" colSpan="5">
                                      Tidak ada
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      {/* Table 1 - Bootstrap Brain Component */}
                      <div className="card widget-card border-light shadow-sm h-100">
                        <div className="card-body p-4">
                          <h5 className="card-title widget-card-title mb-4">
                            Aktivitas Pengajuan Tugas Akhir
                          </h5>
                          <div className="table-responsive">
                            <table className="table table-borderless bsb-table-xl text-nowrap align-middle m-0">
                              <thead>
                                <tr>
                                  <th>Nim</th>
                                  <th>Nama</th>
                                  <th>Contact</th>
                                  <th>Tanggal</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ta?.slice(0, 10).map((data, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>
                                        <h6 className="mb-1">
                                          {data?.mahasiswa?.nim}
                                        </h6>
                                        <span className="text-secondary fs-7">
                                          Teknik Industri
                                        </span>
                                      </td>
                                      <td>
                                        <h6 className="mb-1">
                                          {data?.mahasiswa?.nama}
                                        </h6>
                                        <span className="text-secondary fs-7">
                                          Indonesia
                                        </span>
                                      </td>
                                      <td>
                                        <h6 className="mb-1">
                                          {data?.mahasiswa?.no_hp}
                                        </h6>
                                        <span className="text-secondary fs-7">
                                          {data?.mahasiswa?.email}
                                        </span>
                                      </td>
                                      <td>{`${new Date(
                                        data?.created_at
                                      ).getDate()}-${
                                        new Date(data?.created_at).getMonth() +
                                        1
                                      }-${new Date(
                                        data?.created_at
                                      ).getFullYear()}`}</td>
                                      <td>
                                        {data?.status === "ditolak" && (
                                          <span className="badge rounded-pill bg-danger">
                                            Ditolak
                                          </span>
                                        )}
                                        {data?.status === "diterima" && (
                                          <span className="badge rounded-pill bg-success">
                                            Disetujui
                                          </span>
                                        )}
                                        {data?.status === "menunggu" && (
                                          <span className="badge rounded-pill bg-warning">
                                            Menunggu
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}

                                {ta?.length < 1 ? (
                                  <tr>
                                    <td className="text-center" colSpan="5">
                                      Tidak ada
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 ">
                      {/* Calendar 1 - Bootstrap Brain Component */}
                      <div className="card widget-card border-light shadow-sm h-100">
                        <div className="card-body p-4">
                          <div
                            id="bsb-calendar-1"
                            className="fc fc-media-screen fc-direction-ltr fc-theme-bootstrap5 bsb-calendar-theme"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 ">
                      {/* Timeline 8 - Bootstrap Brain Component */}
                      <div className="card widget-card bsb-timeline-8 border-light shadow-sm h-100">
                        <div className="card-body p-4">
                          <h5 className="card-title widget-card-title mb-3">
                            Aktivitas Pengembangan
                          </h5>
                          <ul className="timeline">
                            <li className="timeline-item">
                              <div className="timeline-body">
                                <div className="timeline-meta">
                                  <span>01 / 08 / 2024</span>
                                </div>
                                <div className="timeline-content timeline-indicator">
                                  <h6 className="mb-1">
                                    Merancang Design Aplikasi (Database, API dan
                                    Ui/Ux)
                                  </h6>
                                  <span className="text-secondary fs-7">
                                    Dev: Agung Wibowo & Mentor
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="timeline-item">
                              <div className="timeline-body">
                                <div className="timeline-meta">
                                  <span>04 / 08 / 2024</span>
                                </div>
                                <div className="timeline-content timeline-indicator">
                                  <h6 className="mb-1">
                                    Pembuatan Rest API & Front-end Web
                                  </h6>
                                  <span className="text-secondary fs-7">
                                    Dev: Agung Wibowo & Mentor
                                  </span>
                                </div>
                              </div>
                            </li>
                            <li className="timeline-item">
                              <div className="timeline-body">
                                <div className="timeline-meta">
                                  <span>Selesai</span>
                                </div>
                                <div className="timeline-content timeline-indicator">
                                  <h6 className="mb-1">Soon...</h6>
                                  <span className="text-secondary fs-7">
                                    Dev: Soon...
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Section - Bootstrap Brain Component */}
              <section className="pb-3 pb-md-4 pb-xl-5 bg-light d-none">
                <div className="container">
                  <div className="row gy-3 gy-md-4">
                    <div className="col-12 col-lg-6 col-xl-7">
                      {/* Map 2 - Bootstrap Brain Component */}
                      <div className="card widget-card border-light shadow-sm h-100">
                        <div className="card-body p-4">
                          <div className="d-block d-sm-flex align-items-center justify-content-between mb-3">
                            <div className="mb-2 mb-sm-0">
                              <h5 className="card-title widget-card-title m-0">
                                Global Sales Overview
                              </h5>
                            </div>
                            <div>
                              <span className="text-secondary fs-7">
                                Last updated: 7 days ago
                              </span>
                            </div>
                          </div>
                          <div id="bsb-map-2" className="bsb-jvm-zoom-btn" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Section - Bootstrap Brain Component */}
              <section className="pb-3 pb-md-4 pb-xl-5 bg-light d-none">
                <div className="container">
                  <div className="row gy-3 gy-md-4">
                    <div className="col-12 col-lg-6 col-xl-7">
                      {/* Chart 3 - Bootstrap Brain Component */}
                      <div className="card widget-card border-light shadow-sm h-100">
                        <div className="card-body p-4">
                          <h5 className="card-title widget-card-title mb-3">
                            Revenue Stats
                          </h5>
                          <div id="bsb-chart-3" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-5">
                      {/* Card 2 - Bootstrap Brain Component */}
                      <div className="card widget-card border-light shadow-sm h-100">
                        <div className="card-body p-4">
                          <h5 className="card-title widget-card-title mb-4">
                            Payment Overview
                          </h5>
                          <div className="row gy-4">
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div className="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                        <i className="bi bi-paypal" />
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="m-0">PayPal</h6>
                                      <p className="text-secondary m-0 fs-7">
                                        Funds Received
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6 className="text-end">$5,432</h6>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div className="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                        <i className="bi bi-stripe" />
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="m-0">Stripe</h6>
                                      <p className="text-secondary m-0 fs-7">
                                        Invoice Paid
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6 className="text-end">$325</h6>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div className="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                        <i className="bi bi-credit-card-fill" />
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="m-0">Credit Card</h6>
                                      <p className="text-secondary m-0 fs-7">
                                        Top Up
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6 className="text-end">$99</h6>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div className="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                        <i className="bi bi-bank2" />
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="m-0">Bank</h6>
                                      <p className="text-secondary m-0 fs-7">
                                        Check Deposited
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6 className="text-end">$2,432</h6>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div className="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                        <i className="bi bi-wallet-fill" />
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="m-0">Wallet</h6>
                                      <p className="text-secondary m-0 fs-7">
                                        Bill Payment
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6 className="text-end">$750</h6>
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="row align-items-center">
                                <div className="col-8">
                                  <div className="d-flex align-items-center">
                                    <div>
                                      <div className="fs-5 bsb-w-50 bsb-h-50 bg-primary-subtle text-primary rounded-2 d-flex align-items-center justify-content-center me-3">
                                        <i className="bi bi-arrow-up-left-circle-fill" />
                                      </div>
                                    </div>
                                    <div>
                                      <h6 className="m-0">Refund</h6>
                                      <p className="text-secondary m-0 fs-7">
                                        Case Closed
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4">
                                  <h6 className="text-end">$289</h6>
                                </div>
                              </div>
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

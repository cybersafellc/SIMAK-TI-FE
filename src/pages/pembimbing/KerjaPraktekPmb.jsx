import { Button, Form, Spinner } from "react-bootstrap";
import FootersAuth from "../../components/FootersAuth";

import React from "react";
import {
  getKP,
  getKPSearch,
  getPembimbingProfile,
} from "../../utils/all-utils";
import { useLocation } from "react-router-dom"; // 1
import { Helmet } from "react-helmet";
import Sidebar from "../../components/pembimbing/Sidebar";
import UpNav from "../../components/pembimbing/UpNav";
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2

export default function KerjaPraktekPmb() {
  const [kp, setKp] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [profile, setProfile] = React.useState({});

  const [search, setSearch] = React.useState("");
  const query = useQuery(); // 3
  const navigateIncrement = () => {
    window.location.href =
      "/pembimbings/kerja-praktek?page=" + (parseInt(page) + 1);
  };
  const navigateDecrement = () => {
    if (page < 2) return;
    window.location.href =
      "/pembimbings/kerja-praktek?page=" + (parseInt(page) - 1);
  };
  const changeSearch = async ({ target }) => {
    setSearch(target.value);
    try {
      const accessToken = localStorage.getItem("pmb_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/pembimbing/login";
        return;
      }
      const [mahasiswa] = await Promise.all([
        new Promise((resolve, reject) => {
          getKPSearch(target.value, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      setKp(mahasiswa);
    } catch (err) {
      // Tangani error dengan lebih hati-hati, misalnya:
      if (err.message !== "Failed to fetch") {
        // Unauthorized
        localStorage.removeItem("pmb_token");
        window.location.href = "/pembimbing/login";
      } else {
        console.error("Error fetching data:", err);
        // Tampilkan pesan error kepada pengguna atau lakukan tindakan lain yang sesuai
      }
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  const handleDetails = async (id) => {
    window.location.href = `/pembimbings/kerja-praktek/details?id=${id}`;
    return;
  };

  React.useEffect(() => {
    if (query.get("page")) {
      setPage(query.get("page"));
    }
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("pmb_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/pembimbing/login";
          return;
        }

        const [kpData, profile] = await Promise.all([
          new Promise((resolve, reject) => {
            getKP(query.get("page") || 1, accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
          new Promise((resolve, reject) => {
            getPembimbingProfile(accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setKp(kpData);
        setProfile(profile);
        console.log(kpData);
      } catch (err) {
        if (err.message == "tolong masukkan access_token valid") {
          // Unauthorized
          localStorage.removeItem("pmb_token");
          window.location.href = "/pembimbing/login";
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
      <Helmet>
        <script
          src="/assets/controller/console-bsb.js"
          type="text/javascript"
        />
        <script src="/assets/controller/chart-1.js" type="text/javascript" />
        <script src="/assets/controller/chart-3.js" type="text/javascript" />
        <script src="/assets/controller/chart-4.js" type="text/javascript" />
      </Helmet>
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          <Sidebar />
          <UpNav user={profile} />
          <main id="main">
            {/* Section - Bootstrap Brain Component */}
            {/* Breadcrumb */}
            <section className="py-3 py-md-4 py-xl-5 bg-light">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1 className="h4">Bimbingan Kerja Praktek</h1>
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
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Kerja Praktek
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </section>

            {/* Section - Bootstrap Brain Component */}
            <section className="pb-3 pb-md-4 pb-xl-5 bg-light min-vh-100">
              <div className="container">
                <div className="row gy-3 gy-md-4">
                  <div className="col-12">
                    {/* Table 1 - Bootstrap Brain Component */}
                    <div className="card widget-card border-light shadow-sm h-100">
                      <div className="card-body p-4">
                        <h5 className="card-title widget-card-title mb-4">
                          List Mahasiswa Bimbingan KP
                        </h5>
                        <div>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>
                              Cari Mahasiswa Bimbingan KP dengan Amda
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Nama"
                              value={search}
                              onChange={changeSearch}
                            />
                            <Form.Text className="text-muted text-capitalize">
                              Untuk Mencari Informasi Mahasiswa Bimbingan KP,
                              Silahkan Masukkan nama Mahasiswa
                            </Form.Text>
                          </Form.Group>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-borderless bsb-table-xl text-nowrap align-middle m-0">
                            <thead>
                              <tr>
                                <th>Nim</th>
                                <th>Nama</th>
                                <th>Kontak</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {kp?.map((data, index) => (
                                <tr>
                                  <td>
                                    <h6 className="mb-1">
                                      {data?.detail_mahasiswa?.nim}
                                    </h6>
                                    <span className="text-secondary fs-7">
                                      Teknik Industri
                                    </span>
                                  </td>
                                  <td>
                                    <h6 className="mb-1">
                                      {data?.detail_mahasiswa?.nama}
                                    </h6>
                                    <span className="text-secondary fs-7">
                                      Indonesia
                                    </span>
                                  </td>
                                  <td>
                                    <h6 className="mb-1">
                                      {data?.detail_mahasiswa?.no_hp}
                                    </h6>
                                    <span className="text-secondary fs-7">
                                      {data?.detail_mahasiswa?.email}
                                    </span>
                                  </td>
                                  <td>{`${new Date(
                                    data?.created_at
                                  ).getDate()}-${
                                    new Date(data?.created_at).getMonth() + 1
                                  }-${new Date(
                                    data?.created_at
                                  ).getFullYear()}`}</td>

                                  <td>
                                    {data?.detail_pengajuan_kp?.status ===
                                      "ditolak" && (
                                      <span className="badge rounded-pill bg-danger">
                                        Ditolak
                                      </span>
                                    )}
                                    {data?.detail_pengajuan_kp?.status ===
                                      "diterima" && (
                                      <span className="badge rounded-pill bg-success">
                                        Disetujui
                                      </span>
                                    )}
                                    {data?.detail_pengajuan_kp?.status ===
                                      "menunggu" && (
                                      <span className="badge rounded-pill bg-warning">
                                        Menunggu
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <Button
                                      className="py-0 px-3"
                                      variant="success"
                                      onClick={() => handleDetails(data?.id)}
                                    >
                                      Tampilkan Details
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                              {kp?.length < 1 ? (
                                <tr>
                                  <td colSpan={6} className="text-center">
                                    Tidak ada
                                  </td>
                                </tr>
                              ) : (
                                ""
                              )}
                            </tbody>
                          </table>
                          <div className="d-flex align-items-center justify-content-between pt-4">
                            <Button
                              disabled={page < 2}
                              className="bg-transparent border-success text-success"
                              onClick={navigateDecrement}
                            >
                              <i class="bx bxs-left-arrow"></i>Prev
                            </Button>
                            <span> Page {page}</span>
                            <Button
                              disabled={kp.length < 30}
                              className="bg-transparent border-success text-success"
                              onClick={navigateIncrement}
                            >
                              Next<i class="bx bxs-right-arrow"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <FootersAuth />
          </main>
        </>
      )}
    </>
  );
}

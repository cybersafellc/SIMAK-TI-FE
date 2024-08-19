import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import React, { useEffect } from "react";
import {
  addBerkas,
  getFiles,
  getKP,
  getMahasiswa,
  getMahasiswaSearch,
  getTA,
} from "../../utils/all-utils";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom"; // 1
import DeleteBerkas from "../../components/kordinators/DeleteBerkas";
import UpNav from "../../components/UpNav";
import { Helmet } from "react-helmet";
import { Modal } from "react-bootstrap";
import Message from "../../components/Message";
import FootersAuth from "../../components/FootersAuth";
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading
  const [page, setPage] = React.useState(1);
  const query = useQuery(); // 3
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const changeFile = ({ target }) => setFile(target.files[0]);
  const changeSearch = async ({ target }) => {
    setSearch(target.value);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      const [mahasiswa] = await Promise.all([
        new Promise((resolve, reject) => {
          getMahasiswaSearch(target.value, accessToken, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      setMahasiswa(mahasiswa);
      console.log(mahasiswa);
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
  const navigateIncrement = () => {
    window.location.href =
      "/kordinators/mahasiswa?page=" + (parseInt(page) + 1);
  };
  const navigateDecrement = () => {
    if (page < 2) return;
    window.location.href =
      "/kordinators/mahasiswa?page=" + (parseInt(page) - 1);
  };
  useEffect(() => {
    if (query.get("page")) {
      setPage(query.get("page"));
    }
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          // Jika tidak ada access token, langsung alihkan ke halaman login
          window.location.href = "/kordinators/login";
          return;
        }
        const [mahasiswa] = await Promise.all([
          new Promise((resolve, reject) => {
            getMahasiswa(query.get("page") || 1, accessToken, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setMahasiswa(mahasiswa);
        console.log(mahasiswa);
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
      {isLoading ? (
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center gap-1">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <>
          <Sidebar />
          <UpNav />
          <section className="py-3 py-md-4 py-xl-5 bg-light">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="h4">Mahasiswa</h1>
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
                        Mahasiswa
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>
          <Section className="pb-5 bg-light">
            <Message
              view={view}
              error={error}
              pesan={message}
              onClose={() => setView(false)}
            />

            <Container>
              <div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Cari Mahasiswa</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nim / Nama"
                    value={search}
                    onChange={changeSearch}
                  />
                  <Form.Text className="text-muted text-capitalize">
                    Untuk Mencari mahasiswa, Silahkan Masukkan nim atau nama
                    mahasiswa
                  </Form.Text>
                </Form.Group>
              </div>
              <div>
                <Card>
                  <Card.Header className="fw-bold text-uppercase">
                    list Mahasiswa
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Table
                      striped
                      hover
                      size="sm"
                      responsive="sm"
                      className="w-100 overflow-scroll"
                    >
                      <thead>
                        <tr className="text-uppercase">
                          <th>nim</th>
                          <th>nama</th>
                          <th>no hp</th>
                          <th>email</th>
                          <th>status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mahasiswa?.map((data, index) => {
                          return (
                            <tr>
                              <td>{data?.nim}</td>
                              <td>{data?.nama}</td>
                              <td>{data?.no_hp}</td>
                              <td>{data?.email}</td>
                              <td>
                                {data?.status == "active" ? (
                                  <Badge className="bg-success">Aktif</Badge>
                                ) : (
                                  <Badge className="bg-danger">
                                    Tidak Aktif
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                        {mahasiswa.length < 1 ? (
                          <tr>
                            <td colSpan={5} className="text-center">
                              Tidak Ada
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </tbody>
                    </Table>

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
                        disabled={mahasiswa.length < 30}
                        className="bg-transparent border-success text-success"
                        onClick={navigateIncrement}
                      >
                        Next<i class="bx bxs-right-arrow"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Container>
          </Section>
          <FootersAuth />
        </>
      )}
    </>
  );
}

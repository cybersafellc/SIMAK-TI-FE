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
import { addBerkas, getFiles, getKP, getTA } from "../../utils/all-utils";
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

export default function Berkas() {
  const [berkas, setBerkas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); // Tambahkan state untuk melacak loading
  const [page, setPage] = React.useState(1);
  const query = useQuery(); // 3
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [deskripsi, setDeskripsi] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const changeFile = ({ target }) => setFile(target.files[0]);
  const changeDeskripsi = ({ target }) => setDeskripsi(target.value);
  const navigateIncrement = () => {
    window.location.href = "/kordinators/berkas?page=" + (parseInt(page) + 1);
  };
  const navigateDecrement = () => {
    if (page < 2) return;
    window.location.href = "/kordinators/berkas?page=" + (parseInt(page) - 1);
  };
  const addBerkasKeun = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const formData = new FormData();
      await formData.append("file", file);
      await formData.append("description", deskripsi);
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          addBerkas(accessToken, formData, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        }),
      ]);
      if (data) {
        setError(false);
        setMessage("Berhasil Menambahkan");
        setShow(false);
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
      setShow(false);
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
        const [berkas] = await Promise.all([
          new Promise((resolve, reject) => {
            getFiles(query.get("page") || 1, (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
          }),
        ]);
        setBerkas(berkas);
        console.log(berkas);
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
      <Helmet>
        <script
          src="/assets/controller/console-bsb.js"
          type="text/javascript"
        />
        <script src="/assets/controller/chart-1.js" type="text/javascript" />
        <script src="/assets/controller/chart-3.js" type="text/javascript" />
        <script src="/assets/controller/chart-4.js" type="text/javascript" />
      </Helmet>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambahkan File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={changeDeskripsi} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Format file : (.docx, .doc, .pdf) </Form.Label>
            <Form.Control type="file" onChange={changeFile} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={addBerkasKeun}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

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
                  <h1 className="h4">Berkas</h1>
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
                        Berkas
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
                <Card>
                  <Card.Header className="fw-bold text-uppercase">
                    EDIT BERKAS
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
                          <th>NO</th>
                          <th>url</th>
                          <th>deskripsi</th>
                          <th className="px-5">aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {berkas?.map((data, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <Nav.Link
                                  href={data?.url}
                                  className="text-primary text-decoration-underline"
                                >
                                  {data?.url}
                                </Nav.Link>
                              </td>
                              <td>{data?.deskripsi}</td>
                              <td className="px-5">
                                <DeleteBerkas id={data?.id} url={data?.url} />
                              </td>
                            </tr>
                          );
                        })}
                        {berkas.length < 1 ? (
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
                    <div className="d-flex justify-content-end py-2">
                      <Button
                        className="d-flex justify-conent-between align-items-center bg-success border-success"
                        onClick={() => setShow(true)}
                      >
                        <i class="bx bx-plus"></i>Tambahkan
                      </Button>
                    </div>
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
                        disabled={berkas.length < 30}
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

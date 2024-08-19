import { Alert, Button, Card, Form, Nav, Table } from "react-bootstrap";
import Navbars from "../components/Navbars";
import Section from "../components/Section";
import Container from "react-bootstrap/Container";
import { getFiles, getFilesSearch } from "../utils/all-utils";
import React, { useEffect } from "react";
import Footers from "../components/Footers";
import { useLocation } from "react-router-dom"; // 1
function useQuery() {
  return new URLSearchParams(useLocation().search);
} // 2
const domain = "https://simak-ti.htp.my.id";

export default function Download() {
  const [files, setFiles] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const query = useQuery(); // 3
  const handleHref = (url) => {
    window.open(url, "_blank");
  };
  const navigateIncrement = () => {
    window.location.href = "/download?page=" + (parseInt(page) + 1);
  };

  const navigateDecrement = () => {
    if (page < 2) return;
    window.location.href = "/download?page=" + (parseInt(page) - 1);
  };

  const onSearch = ({ target }) => {
    getFilesSearch(target.value, (err, files) => {
      if (err) {
        console.log(err);
      }
      if (files) {
        setFiles(files);
        setSearch(target.value);
      }
    });
  };
  useEffect(() => {
    if (query.get("page")) {
      setPage(query.get("page"));
    }
    // pemanggilan data
    getFiles(query.get("page") || 1, (err, files) => {
      if (err) {
        console.log(err);
      }
      if (files) {
        setFiles(files);
      }
    });
  }, []);
  return (
    <>
      <Navbars />
      <Section className="pt-10 pb-5">
        <Container>
          <Alert variant="warning">
            PENTING!: Unduh Berkas Wajib untuk Akses Layanan Kerja Praktek dan
            Tugas Akhir
          </Alert>
          <div>
            <Card>
              <Card.Header
                as="h5"
                className="py-3 d-flex align-items-center gap-1"
              >
                <i class="bx bx-file"></i> Berkas
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    onChange={onSearch}
                  />
                  <Form.Text className="text-muted">
                    Silahkan Cari Berkas yang anda butuhkan
                  </Form.Text>
                </Form.Group>
                {/* <div className="table-responsive">
                  <table className="table table-borderless bsb-table-xl text-nowrap align-middle m-0">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Url</th>
                        <th>Deskripsi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <h6 className="mb-1">#HO3210</h6>
                          <span className="text-secondary fs-7">
                            Web, UI Design
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-1">Oliver</h6>
                          <span className="text-secondary fs-7">
                            United States
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-1">Bootstrap</h6>
                          <span className="text-secondary fs-7">v5.3+</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                <Table responsive="sm" striped hover>
                  <thead className="text-uppercase">
                    <tr>
                      <th className="p-3">URL</th>
                      <th className="p-3">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files?.map((file, index) => {
                      return (
                        <tr key={index + 1}>
                          <td className="p-3">
                            <Nav.Link
                              onClick={() => handleHref(file?.url)}
                              className="text-decoration-underline text-primary"
                            >
                              {file?.url}
                            </Nav.Link>
                            {/* <Button
                              className="text-capitalize bg-success border-success d-flex justify-content-center align-items-center gap-1 px-3 py-0"
                              onClick={() => handleHref(file.url)}
                            >
                              <i class="bx bxs-download"></i> DOWNLOAD
                            </Button> */}
                          </td>
                          <td className="p-3">{file?.deskripsi}</td>
                        </tr>
                      );
                    })}
                    {files.length < 1 ? (
                      <tr>
                        <td colSpan={3} className="p-3 text-center">
                          <span>"{search}" Tidak ada</span>
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
                    disabled={files.length < 30}
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
      <Footers />
    </>
  );
}

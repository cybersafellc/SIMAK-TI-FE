import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import Message from "../Message";
import { deleteBerkas } from "../../utils/all-utils";

export default function DeleteBerkas({ id, url }) {
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [view, setView] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Jika tidak ada access token, langsung alihkan ke halaman login
        window.location.href = "/kordinators/login";
        return;
      }
      setLoading(true);
      const [data] = await Promise.all([
        new Promise((resolve, reject) => {
          deleteBerkas(
            id,
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
        setMessage("Berhasil Menghapus!");
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

  return (
    <>
      <Button
        disabled={loading}
        variant="danger"
        className="d-flex align-items-center gap-1 py-0 px-3"
        onClick={handleShow}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <>
            <i class="bx bx-trash"></i> Hapus
          </>
        )}
      </Button>

      <Message
        view={view}
        error={error}
        pesan={message}
        onClose={() => setView(false)}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah anda yakin untuk menghapus?
          <div>
            <span className="fw-bold text-uppercase">id</span> : {id}
          </div>
          <div>
            <span className="fw-bold text-uppercase">url</span> : {url}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tidak
          </Button>
          <Button variant="success" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <i class="bx bx-trash"></i> Hapus
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

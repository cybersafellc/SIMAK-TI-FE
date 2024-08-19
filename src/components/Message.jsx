import { Toast } from "react-bootstrap";

export default function Message({ view, onClose, pesan, error }) {
  return (
    <>
      <Toast show={view} onClose={onClose} className="error-pst z-100">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">
            {error ? (
              <span className="d-flex align-items-center gap-1 text-danger">
                <i class="bx bxs-error-alt fs-5"></i>Pesan Error
              </span>
            ) : (
              <span className="d-flex align-items-center gap-1 text-success">
                <i class="bx bxs-check-circle"></i>Berhasil
              </span>
            )}
          </strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>{pesan}</Toast.Body>
      </Toast>
    </>
  );
}

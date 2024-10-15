"use client";
import React, { useState } from 'react';
import { BiX } from 'react-icons/bi'; // Import ikon silang

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    namaKegiatan: '',
    tanggal: '',
    kategori: 'Umum',
    keterangan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data, misal: kirim ke server
    console.log('Data form:', formData);
    onClose(); // Tutup modal setelah submit
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Tambah Kegiatan</h2>
          <button
            className="close-button"
            onClick={onClose}
            style={{
              backgroundColor: '#d50000',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '4px 4px',
              cursor: 'pointer',
            }}
          >
            <BiX size={20} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="namaKegiatan">Nama Kegiatan:</label>
              <input
                type="text"
                id="namaKegiatan"
                name="namaKegiatan"
                value={formData.namaKegiatan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="tanggal">Tanggal:</label>
              <input
                type="date"
                id="tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="kategori">Kategori:</label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
              >
                <option value="Katib">Katib</option>
                <option value="Muazin">Muazin</option>
                <option value="Umum">Umum</option>
              </select>
            </div>
            <div>
              <label htmlFor="keterangan">Keterangan:</label>
              <textarea
                id="keterangan"
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .modal-title {
          color: black;
          font-weight: 600; /* Semi-bold */
        }
        .close-button {
          background-color: transparent;
          border: none;
          color: #CA0A37;
          cursor: pointer;
        }
        .modal-body {
          display: flex;
          flex-direction: column;
        }
        form div {
          margin-bottom: 10px;
        }
        label {
          margin-right: 10px;
        }
        input, select, textarea {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
        }
        .submit-button {
          padding: 8px 16px;
          background-color: #d50000;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: #14B8A6;
        }
      `}</style>
    </div>
  );
};

export default ModalForm;

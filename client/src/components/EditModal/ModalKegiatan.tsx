import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    id: string;
}

interface Image {
    id: number;
    keterangan: string;
    kategori: string;
    image: string;
  }
  
  interface Kegiatan {
    id: number;
    nama_kegiatan: string;
    tanggal: string;
    lokasi: string;
    kategori: string;
    keterangan: string;
    image: Image[];
  }


const EditKegiatan: React.FC<ModalFormProps> = ({ isOpen, onClose, onSubmit, id }) => {
    const [kegiatan, setKegiatan] = useState<Kegiatan | null>(null);
    const [formData, setFormData] = useState({
        nama_kegiatan: '',
        tanggal: '',
        lokasi: '',
        kategori: 'umum',
        keterangan: '',
        image: null as File | null,
    });
    
    const [fotoUrl, setFotoUrl] = useState<string | null>(null); // State for the photo URL
    const [fileError, setFileError] = useState(''); // State for file error message

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/kegiatan/${id}`);
                    const data = response.data;

                    // Setel data kegiatan ke formData dan set foto URL untuk pratinjau
                    setFormData({
                        nama_kegiatan: data.nama_kegiatan,
                        tanggal: data.tanggal,
                        lokasi: data.lokasi,
                        kategori: data.kategori || 'umum',
                        keterangan: data.keterangan,
                        image: null,
                    });

                    // Kombinasikan base URL dengan path foto dari backend
                    if (data.image) {
                        setFotoUrl(`http://localhost:8000/storage/${data.image}`);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [isOpen, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const file = e.target.files?.[0];
        const maxFileSize = 8 * 1024 * 1024; // 8MB in bytes
        const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];

        if (file) {
            if (file.size > maxFileSize) {
                setFileError('Foto maks 8MB.');
                e.target.value = ''; // Reset input
                return;
            } else if (!allowedFormats.includes(file.type)) {
                setFileError('Format foto hanya diperbolehkan JPG, JPEG, dan PNG.');
                e.target.value = ''; // Reset input
                return;
            } else {
                setFileError(''); // Clear error if file is valid
            }

            // Update foto dan tampilkan pratinjau
            setFotoUrl(URL.createObjectURL(file)); // Menampilkan pratinjau dari file baru
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            image: file || null,
        }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();

        data.append('nama_kegiatan', formData.nama_kegiatan);
        data.append('tanggal', formData.tanggal);
        data.append('lokasi', formData.lokasi);
        data.append('kategori', formData.kategori);
        data.append('keterangan', formData.keterangan);

        if (formData.image) {
            data.append('foto', formData.image);
        } else if (fotoUrl) {
            // Jika tidak ada gambar baru, kirim gambar lama
            data.append('image', fotoUrl); // Pastikan URL gambar lama dikirim jika diperlukan
        }
        try {
            await axios.put(`http://localhost:8000/api/kegiatan/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onClose();
            onSubmit();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">Edit Kegiatan</h2>
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
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label htmlFor="nama_kegiatan">Nama Kegiatan:</label>
                            <input
                                type="text"
                                id="nama_kegiatan"
                                name="nama_kegiatan"
                                value={formData.nama_kegiatan}
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
                            <label htmlFor="lokasi">Lokasi:</label>
                            <input
                                type="text"
                                id="lokasi"
                                name="lokasi"
                                value={formData.lokasi}
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
                                <option value="khatib">Khatib</option>
                                <option value="muazin">Muazin</option>
                                <option value="umum">Umum</option>
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
                        <div>
                            <label htmlFor="foto">Foto:</label>
                            {/* Pratinjau foto */}
                            {fotoUrl && (
                                <img
                                    src={fotoUrl}
                                    alt="Pratinjau Foto"
                                    style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                                />
                            )}
                            <input
                                type="file"
                                id="image"
                                name="foto"
                                accept="image/jpeg, image/jpg, image/png"
                                onChange={handleFileChange}
                            />
                            {fileError && <p style={{ color: "red" }}>{fileError}</p>}
                        </div>
                        <button type="submit" className="submit-button">Update</button>
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
                    z-index: 9999;
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
                    font-weight: 600;
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
                .error-message {
                    color: #d50000;
                    font-size: 0.875rem;
                    margin-top: 4px;
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

export default EditKegiatan;

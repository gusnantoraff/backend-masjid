/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef } from "react";
import axios from "@/utils/axios";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    judul_surat: "",
    isi_surat: "",
    stempel: null as File | null,
    tanda_tangan: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    data.append("judul_surat", formData.judul_surat);
    data.append("tanggal_publikasi", formattedDate);
    data.append("isi_surat", content);

    if (formData.stempel) {
      data.append("stempel", formData.stempel);
    }

    if (formData.tanda_tangan) {
      data.append("tanda_tangan", formData.tanda_tangan);
    }

    setLoading(true);

    try {
      const response = await axios.post("/berita", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from API:", response.data);
      setFormData(initialFormData);
      setContent("");
      onSubmit();
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formBody}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            <div style={styles.formGroup}>
              <label htmlFor="judul_surat" style={styles.label}>
                Judul Surat
              </label>
              <textarea
                id="judul_surat"
                name="judul_surat"
                placeholder="Masukan Judul"
                value={formData.judul_surat}
                onChange={handleChange}
                rows={2}
                style={styles.textarea}
              />
            </div>

            {/* Content Editor */}
            <div style={styles.formGroup}>
              <label htmlFor="isi_surat" style={styles.label}>
                Isi Surat
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            <div style={styles.formGroup}>
              <label htmlFor="stempel" style={styles.label}>
                Stempel
              </label>
              <input
                type="file"
                id="stempel"
                name="stempel"
                onChange={handleFileChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="tanda_tangan" style={styles.label}>
                Tanda Tangan
              </label>
              <input
                type="file"
                id="tanda_tangan"
                name="tanda_tangan"
                onChange={handleFileChange}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button type="submit" style={styles.saveButton}>
            {loading ? "Loading..." : "Simpan"}
          </button>
          <button type="button" onClick={onClose} style={styles.cancelButton}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formBody: {
    display: "flex",
    gap: "20px",
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
    color: "#000",
    fontSize: "16px",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    resize: "vertical",
  },
  saveButton: {
    backgroundColor: "#14B8A6",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
};

export default ModalForm;

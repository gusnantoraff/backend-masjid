import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  judul: string;
  kategori: string;
  status: string;
  konten: string;
  foto: File | null;
}

export default function ArticleForm() {
  const [formData, setFormData] = useState<FormData>({
    judul: 'Masukan Judul',
    kategori: 'Pilih Kategori',
    status: 'Draft',
    konten: 'Placeholder text',
    foto: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, foto: e.target.files[0] });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to handle form submission, like sending it to an API
  };

  return (
    <div style={styles.formContainer}>
      <form onSubmit={handleSubmit}>

        {/* Title Input */}
        <div style={styles.formGroup}>
          <label htmlFor="judul">Judul</label>
          <input
            type="judul"
            id="judul"
            name="judul"
            placeholder="Masukan Judul"
            value={formData.judul}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Category Dropdown */}
        <div style={styles.formGroup}>
          <label htmlFor="kategori">Kategori</label>
          <select
            id="kategori"
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Pilih Kategori</option>
            <option value="News">News</option>
            <option value="Sport">Sport</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div style={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* Content Textarea */}
        <div style={styles.formGroup}>
          <label htmlFor="konten">Konten</label>
          <textarea
            id="konten"
            name="konten"
            placeholder="Placeholder text"
            value={formData.konten}
            onChange={handleChange}
            style={{ ...styles.input, minHeight: '100px' }}
          />
          <div style={styles.toolbar}>
            <button type="button" style={styles.toolbarButton}><b>B</b></button>
            <button type="button" style={styles.toolbarButton}><i>I</i></button>
            <button type="button" style={styles.toolbarButton}><u>U</u></button>
            <button type="button" style={styles.toolbarButton}>H1</button>
            <button type="button" style={styles.toolbarButton}>H2</button>
            <button type="button" style={styles.toolbarButton}>H3</button>
            <button type="button" style={styles.toolbarButton}>Link</button>
            <button type="button" style={styles.toolbarButton}>Quote</button>
          </div>
        </div>

        {/* Image Upload */}
        <div style={styles.formGroup}>
          <label htmlFor="foto">Foto</label>
          <input
            type="file"
            id="foto"
            name="foto"
            onChange={handleImageChange}
            style={styles.input}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.saveButton}>
          Simpan
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  toolbar: {
    display: 'flex',
    gap: '10px',
  },
  toolbarButton: {
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f1f1f1',
  },
  saveButton: {
    backgroundColor: '#14B8A6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

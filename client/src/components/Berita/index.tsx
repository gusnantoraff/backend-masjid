import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Typography, Button } from '@mui/material';  // Import Box, Typography, Button from Material UI
import { AiOutlineClose } from 'react-icons/ai';  // Import the close icon

interface FormData {
  judul: string;
  kategori: string;
  status: string;
  konten: string;
  foto: File | null;
}

export default function ArticleForm() {
  const [formData, setFormData] = useState<FormData>({
    judul: '',
    kategori: '',
    status: 'Draft',
    konten: '',
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
  };

  // Handle cancel button click
  const handleCancel = () => {
    console.log("Cancelled!");
    // Add your cancellation logic here, like resetting the form or navigating away
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>

        {/* Add the Box Component Here */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#EDF1F8',
            color: 'black',
            borderRadius: '10px',
            width: '100%'
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: '600', fontFamily: 'Nunito Sans' }}
          >
            Berita / Artikel
          </Typography>
          <Box>
            {/* "X Batal" button */}
            <Button
              variant="contained"
              sx={{ backgroundColor: '#d50000', color: 'white' }}  // Red button
              startIcon={<AiOutlineClose />}  // Icon for "X"
              onClick={handleCancel}  // Attach the cancel action here
            >
              Batal
            </Button>
          </Box>
        </Box>

        <div style={styles.formBody}>
          {/* Left Column */}
          <div style={styles.leftColumn}>
            
            {/* Title Input */}
            <div style={styles.formGroup}>
              <label htmlFor="judul" style={styles.label}>Judul</label>
              <input
                type="text"
                id="judul"
                name="judul"
                placeholder="Masukan Judul"
                value={formData.judul}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Content Textarea */}
            <div style={styles.formGroup}>
              <label htmlFor="konten" style={styles.label}>Konten</label>
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
              <textarea
                id="konten"
                name="konten"
                placeholder="Placeholder text"
                value={formData.konten}
                onChange={handleChange}
                style={{ ...styles.textarea, ...styles.input }}
              />
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            
            {/* Category Dropdown */}
            <div style={styles.formGroup}>
              <label htmlFor="kategori" style={styles.label}>Kategori</label>
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
              <label htmlFor="status" style={styles.label}>Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Image Upload */}
            <div style={styles.formGroup}>
              <label htmlFor="foto" style={styles.label}>Foto</label>
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={handleImageChange}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Footer with Submit Button */}
        <div style={styles.footer}>
          <button type="submit" style={styles.saveButton}>Simpan</button>
        </div>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 'full',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formBody: {
    display: 'flex',
    gap: '20px',
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 200, // Roboto Regular (normal weight)
    color: '#000',
    fontSize: '16px',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  toolbar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  toolbarButton: {
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#f1f1f1',
  },
  textarea: {
    minHeight: '150px',
  },
  saveButton: {
    backgroundColor: '#14B8A6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
};

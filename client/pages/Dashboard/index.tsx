import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Logging in with:', email, password);
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src="" alt="" style={styles.image} />
      </div>

      <div style={styles.formContainer}>
        <div style={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Masukan Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                style={styles.inputField}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Kata Sandi</label>
              <input
                type="password"
                placeholder="Masukan Kata Sandi"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                style={styles.inputField}
                required
              />
            </div>

            <button type="submit" style={styles.submitButton}>Login</button>

            <p style={styles.registerLink}>
              Belum Punya Akun? <a href="#">Daftar</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    flex: 1,
    position: 'relative' as 'relative', 
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formCard: {
    width: '80%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
  },
  logoText: {
    textAlign: 'center' as 'center', 
    fontSize: '24px',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#d10000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  registerLink: {
    textAlign: 'center' as 'center', 
    marginTop: '20px',
  },
};

export default Dashboard;

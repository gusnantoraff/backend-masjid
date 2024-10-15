'use client';

import React, { useState } from 'react';
import styles from '../../styles/LoginPage.module.css'
import InputField from '../InputField';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Register failed. Please check your credentials.');
      }

      const data = await response.json();
      console.log('Register successful:', data);
      router.push('/app');
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during register.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.loginContainer}>
      <div className={styles.contentWrapper}>
        <section className={styles.imageColumn}>
          <img loading="lazy" src="images/masjid.jpg" alt="Login illustration" className={styles.loginImage} />
        </section>
        <section className={styles.formColumn}>
          <div className={styles.formWrapper}>
            <img loading="lazy" src="images/logo.png" alt="Company logo" className={styles.logo} />
            <div className={styles.formContainer}>
              <form className={styles.formInner} onSubmit={handleLogin}>
                <InputField
                  label="Email"
                  type="email"
                  placeholder="Masukan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/752c057431de35aee51b53d713a776157f2d93a1507ca0cc4f4ceaa7a1d738e7?placeholderIfAbsent=true&apiKey=0071786d14794a0283243dd846096a5a"
                />
                <InputField
                  label="Buat Kata Sandi"
                  type="password"
                  placeholder="Buat Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7daa5e8b61dc30306140a9b07e4c21364e6d726bcf3998aff700423ef6c7bd29?placeholderIfAbsent=true&apiKey=0071786d14794a0283243dd846096a5a"
                />
                 <InputField
                  label="Konfirmasi Kata Sandi"
                  type="password"
                  placeholder="Konfirmasi Kata Sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7daa5e8b61dc30306140a9b07e4c21364e6d726bcf3998aff700423ef6c7bd29?placeholderIfAbsent=true&apiKey=0071786d14794a0283243dd846096a5a"
                />
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                <button type="submit" className={styles.loginButton} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Register'}
                </button>
                <p className={styles.signupPrompt}>
                  Sudah Punya Akun? <a href="/" className={styles.signupLink}>Masuk</a>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
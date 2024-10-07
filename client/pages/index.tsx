import React from 'react';
import styles from '../styles/LoginPage.module.css';

import InputField from './InputField';

const LoginPage: React.FC = () => {
  return (
    <main className={styles.loginContainer}>
      <div className={styles.contentWrapper}>
        <section className={styles.imageColumn}>
          <img loading="lazy" src="masjid.jpg" alt="Login illustration" className={styles.loginImage} />
        </section>
        <section className={styles.formColumn}>
          <div className={styles.formWrapper}>
            <img loading="lazy" src="logo.png" alt="Company logo" className={styles.logo} />
            <div className={styles.formContainer}>
              <form className={styles.formInner}>
                <InputField
                  label="Email"
                  type="email"
                  placeholder="Masukan Email"
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/752c057431de35aee51b53d713a776157f2d93a1507ca0cc4f4ceaa7a1d738e7?placeholderIfAbsent=true&apiKey=0071786d14794a0283243dd846096a5a"
                />
                <InputField
                  label="Kata Sandi"
                  type="password"
                  placeholder="Masukan Kata Sandi"
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/7daa5e8b61dc30306140a9b07e4c21364e6d726bcf3998aff700423ef6c7bd29?placeholderIfAbsent=true&apiKey=0071786d14794a0283243dd846096a5a"
                />
                <a href="#" className={styles.forgotPassword}>Lupa Kata Sandi?</a>
                <button type="submit" className={styles.loginButton}>Login</button>
                <p className={styles.signupPrompt}>
              Belum Punya Akun? <a href="#" className={styles.signupLink}>Daftar</a>
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
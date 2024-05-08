import styles from "./HomePage.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.jumbotron}>
        <h1 className={styles.heading}>Welcome to my volunteering website!</h1>
        <p className={styles.lead}>
          This website provides functionalities for managing activities,
          volunteers, and volunteering organizations. Users can interact with
          the platform either as regular users or administrators.
        </p>
        <hr className={styles.hr} />
        <p className={styles.paragraph}>
          Feel free to explore and get involved!
        </p>
      </div>
      <div className={styles.info}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p className={styles.sectionText}>
          As a highly communicative and organized professional, I take pride in
          my independent and detail-oriented work style. My reliability and
          discretion are integral to my approach. I cherish teamwork and
          maintain a positive attitude in all endeavors. I have a strong desire
          to learn and expand my knowledge.
        </p>
        <h2 className={styles.sectionTitle}>Contact Information</h2>
        <p className={styles.sectionText}>
          For more information, feel free to contact me via email at{" "}
          <a href="mailto:msserezlija@gmail.com" className={styles.link}>
            msserezlija@gmail.com
          </a>
          , or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/m-serezlija/"
            className={styles.link}
          >
            LinkedIn
          </a>{" "}
          or{" "}
          <a href="https://github.com/mserezlija" className={styles.link}>
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Home;

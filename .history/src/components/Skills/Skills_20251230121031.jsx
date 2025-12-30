import { skills, softSkills } from '../../data/portfolioData';
import styles from './Skills.module.css';

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Habilidades</h2>

        <div className={styles.content}>
          <div className={styles.technicalSkills}>
            <h3 className={styles.categoryTitle}>Habilidades Técnicas</h3>
            
            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <h4>Backend</h4>
                <div className={styles.skillsList}>
                  {skills.backend.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h4>Frontend</h4>
                <div className={styles.skillsList}>
                  {skills.frontend.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h4>Base de Datos</h4>
                <div className={styles.skillsList}>
                  {skills.database.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h4>Metodologías</h4>
                <div className={styles.skillsList}>
                  {skills.methodologies.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h4>Herramientas</h4>
                <div className={styles.skillsList}>
                  {skills.tools.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h4>Diseño y Modelado</h4>
                <div className={styles.skillsList}>
                  {skills.design.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.skillCategory}>
                <h4>Administrativo y Comercial</h4>
                <div className={styles.skillsList}>
                  {skills.administrative.map((skill, index) => (
                    <span key={index} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.softSkillsSection}>
            <h3 className={styles.categoryTitle}>Habilidades Blandas</h3>
            <div className={styles.softSkillsGrid}>
              {softSkills.map((skill, index) => (
                <div key={index} className={styles.softSkillCard}>
                  <h4>{skill.title}</h4>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
import React from 'react'

import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGithub,
    faGoogle,
    faFacebook,
    faLinkedin
} from '@fortawesome/free-brands-svg-icons';



function Footer() {
    const d = new Date();
    const n = d.getFullYear();
    return (
        <footer className={styles.footer}>
            <p className={styles.para}>&copy; {n} | Gourav Aggarwal | <a href="https://github.com/gouravagg77/" className={styles.link_github}><FontAwesomeIcon className={styles.icon} icon={faGithub} /></a> | <a href="https://www.linkedin.com/in/gourav-aggarwal-486a62160/" className={styles.link_linkedin}><FontAwesomeIcon className={styles.icon} icon={faLinkedin} /></a>
            </p>
        </footer>
    )
}

export default Footer

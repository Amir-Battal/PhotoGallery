import React from 'react';
import styles from './styles.module.css';
import { IoCloseCircleSharp } from "react-icons/io5";


const PopupForm = (props) => {

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupInner}>
                <button className={styles.closeBtn} onClick={() => props.setTrigger(false)}>
                    <IoCloseCircleSharp />
                </button>
                { props.children }
            </div>
        </div>
    ) : "";
};

export default PopupForm;

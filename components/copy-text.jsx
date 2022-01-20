import {
    useCallback,
    useState
} from 'react';
import clsx from 'clsx';

import buttonStyles from '../styles/button.module.css';
import styles from './copy-text.module.css';

export default function CopyText({text}) {
    const [disabled, setDisabled] = useState(false);

    const onClick = useCallback(() => {
        setDisabled(true);
        copyTextToClipboard(text);
    }, [text]);

    let displayText = text;

    if (displayText.length > 50) {
        displayText = `${displayText.substring(0, 6)}...`;
    }

    return (
        <div
            className={styles.container}
        >
            <div
                className={styles.text}
            >
                {displayText}
            </div>

            <div
                className={clsx(
                    buttonStyles.button,
                    disabled && buttonStyles.disabled,
                    styles.copy
                )}
                title={'Copy'}
                onClick={onClick}
            >
                <CopyIcon />
            </div>
        </div>
    );
}

function copyTextToClipboard(text) {
    /**
     * Taken from here: https://stackoverflow.com/a/30810322/8445442
     */

    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }

    navigator.clipboard.writeText(text);
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom.
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error(err);
    }

    document.body.removeChild(textArea);
}

function CopyIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='20' viewBox='0 0 18 20' fill='none'>
            <path d='M13 18H5C4.20435 18 3.44129 17.6839 2.87868 17.1213C2.31607 16.5587 2 15.7956 2 15V5C2 4.73478 1.89464 4.48043 1.70711 4.29289C1.51957 4.10536 1.26522 4 1 4C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5V15C0 16.3261 0.526784 17.5979 1.46447 18.5355C2.40215 19.4732 3.67392 20 5 20H13C13.2652 20 13.5196 19.8946 13.7071 19.7071C13.8946 19.5196 14 19.2652 14 19C14 18.7348 13.8946 18.4804 13.7071 18.2929C13.5196 18.1054 13.2652 18 13 18ZM18 6.94C17.9896 6.84813 17.9695 6.75763 17.94 6.67V6.58C17.8919 6.47718 17.8278 6.38267 17.75 6.3L11.75 0.3C11.6673 0.222216 11.5728 0.158081 11.47 0.11H11.38L11.06 0H7C6.20435 0 5.44129 0.316071 4.87868 0.87868C4.31607 1.44129 4 2.20435 4 3V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H15C15.7956 16 16.5587 15.6839 17.1213 15.1213C17.6839 14.5587 18 13.7956 18 13V7C18 7 18 7 18 6.94ZM12 3.41L14.59 6H13C12.7348 6 12.4804 5.89464 12.2929 5.70711C12.1054 5.51957 12 5.26522 12 5V3.41ZM16 13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H7C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2H10V5C10 5.79565 10.3161 6.55871 10.8787 7.12132C11.4413 7.68393 12.2044 8 13 8H16V13Z' fill='#4164E2' />
        </svg>
    );
}

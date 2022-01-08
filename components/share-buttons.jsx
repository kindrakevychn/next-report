import clsx from 'clsx';

import buttonStyles from '../styles/button.module.css';
import styles from './share-buttons.module.css';

export default function ShareButtons({
    articleTitle,
    score,
    reportURL
}) {
    const urls = createURLs({
        articleTitle,
        score,
        reportURL
    });
    const buttons = [
        {
            type: 'twitter',
            url: urls.twitter
        },
        {
            type: 'facebook',
            url: urls.facebook
        },
        {
            type: 'reddit',
            url: urls.reddit
        },
        {
            type: 'email',
            url: urls.email
        },
    ];

    return (
        <div
            className={styles.buttons}
        >
            {
                buttons.map((b) => (
                    <ShareButton
                        key={b.type}
                        type={b.type}
                        url={b.url}
                    />
                ))
            }
        </div>
    );
}

function ShareButton({
    type,
    url
}) {
    let Icon;
    let title;

    switch (type) {
        default:
        case 'twitter': {
            Icon = TwitterIcon;
            title = 'Share via Twitter';
            break;
        }

        case 'facebook': {
            Icon = FacebookIcon;
            title = 'Share via Facebook';
            break;
        }

        case 'reddit': {
            Icon = RedditIcon;
            title = 'Share via Reddit';
            break;
        }

        case 'email': {
            Icon = EmailIcon;
            title = 'Share via email';
            break;
        }
    }

    return (
        <a
            className={clsx(buttonStyles.button, styles.button)}
            href={url}
            target={'_blank'}
            rel={'noreferrer noopener'}
            title={title}
        >
            <Icon />
        </a>
    );
}

function createURLs({
    articleTitle,
    score,
    reportURL
}) {
    let shortArticleTitle = articleTitle.substring(0, 100);

    if (shortArticleTitle !== articleTitle) {
        shortArticleTitle += '...';
    }

    const email = {
        subject: encodeURIComponent("I'd like to share this with you"),
        body: encodeURIComponent(
            `Hey, I was reading this article titled "${articleTitle}" and thought you might be interested.\n\n` +
            `Its Valurank (https://valurank.com) score is ${score}.\n\n` +
            `Here's the quality report: ${reportURL}\n\n` +
            "If you're looking for the original article, click through the link at the top of the report.\n\n" +
            'Thanks!'
        )
    };
    const twitter = {
        text: encodeURIComponent(`I ran @valurank on the article "${articleTitle}". It scored ${score}. Do you think this is correct? Here's the full report.`),
        hashtags: encodeURIComponent('valurank')
    };
    const reddit = {
        title: encodeURIComponent(`I ranked an article titled "${shortArticleTitle}" using Valurank`),
        body: encodeURIComponent(`I ran [@valurank](https://www.reddit.com/user/valurank) on this article. It scored ${score}. Do you think this is correct? Here's the full report: ${reportURL}`),
    };

    return {
        facebook: `https://www.facebook.com/sharer.php?u=${reportURL}`,
        reddit: `https://reddit.com/submit?text=${reddit.body}&title=${reddit.title}`,
        twitter: `https://twitter.com/intent/tweet?url=${reportURL}&text=${twitter.text}&hashtags=${twitter.hashtags}`,
        email: `mailto:?subject=${email.subject}&body=${email.body}`
    };
}

function TwitterIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='23' height='19' viewBox='0 0 23 19' fill='none'>
            <path d='M22.9912 1.45021C22.9913 1.27357 22.9447 1.10007 22.8559 0.947351C22.7671 0.794637 22.6395 0.668172 22.486 0.580837C22.3324 0.493502 22.1585 0.448416 21.9819 0.45017C21.8053 0.451925 21.6323 0.500458 21.4805 0.590826C20.8952 0.939211 20.265 1.20601 19.6075 1.38383C18.6685 0.578058 17.4708 0.137129 16.2335 0.141636C14.8761 0.143198 13.5724 0.672229 12.5977 1.61702C11.623 2.56181 11.0537 3.8484 11.0099 5.20512C8.33384 4.77838 5.90849 3.38164 4.19631 1.28126C4.09315 1.15609 3.9614 1.05757 3.81217 0.994002C3.66295 0.930434 3.50062 0.903683 3.33889 0.916006C3.17725 0.929315 3.02128 0.981799 2.88448 1.06892C2.74768 1.15603 2.63416 1.27516 2.55373 1.41601C2.14126 2.13582 1.90436 2.94276 1.86228 3.77131C1.8202 4.59986 1.97412 5.42666 2.31154 6.18456L2.30959 6.18651C2.15794 6.27991 2.03278 6.41066 1.94609 6.56625C1.85941 6.72185 1.81409 6.89708 1.81447 7.07519C1.81263 7.22211 1.82145 7.36898 1.84084 7.51464C1.94298 8.7729 2.50062 9.95069 3.4092 10.8271C3.34756 10.9446 3.30994 11.0731 3.29854 11.2052C3.28714 11.3373 3.30218 11.4704 3.34279 11.5967C3.7389 12.8308 4.58129 13.8727 5.7051 14.5185C4.56334 14.96 3.33052 15.114 2.11525 14.9668C1.89032 14.9386 1.66248 14.9876 1.4691 15.1059C1.27572 15.2242 1.12828 15.4047 1.05097 15.6178C0.973654 15.8309 0.97106 16.0639 1.04361 16.2787C1.11616 16.4935 1.25955 16.6772 1.45025 16.7998C3.54034 18.146 5.97393 18.8617 8.46002 18.8613C11.2793 18.893 14.03 17.9921 16.2843 16.2988C18.5385 14.6054 20.17 12.2145 20.9248 9.49801C21.2779 8.31464 21.4582 7.08648 21.46 5.85157C21.46 5.78614 21.46 5.71876 21.459 5.65138C21.9811 5.08831 22.3856 4.42668 22.6487 3.70527C22.9118 2.98387 23.0283 2.2172 22.9912 1.45021ZM19.6846 4.66212C19.5194 4.85746 19.4358 5.10891 19.4512 5.36427C19.461 5.52927 19.46 5.69527 19.46 5.85157C19.4579 6.89511 19.305 7.93287 19.0059 8.93263C18.3894 11.244 17.015 13.2817 15.103 14.7192C13.1909 16.1568 10.8517 16.9111 8.46002 16.8613C7.6009 16.8616 6.74474 16.7606 5.90924 16.5606C6.97465 16.2172 7.97083 15.6879 8.85162 14.9971C9.01385 14.8693 9.13257 14.6945 9.19151 14.4967C9.25044 14.2988 9.2467 14.0875 9.18079 13.8918C9.11489 13.6961 8.99005 13.5257 8.8234 13.4038C8.65675 13.2819 8.45647 13.2145 8.25002 13.2109C7.41885 13.198 6.62515 12.863 6.03615 12.2764C6.18557 12.2481 6.33401 12.2129 6.48147 12.1709C6.69748 12.1094 6.88651 11.977 7.01813 11.795C7.14975 11.6131 7.21629 11.3921 7.20704 11.1677C7.1978 10.9433 7.1133 10.7285 6.96715 10.558C6.82101 10.3874 6.62173 10.2711 6.40139 10.2275C5.91893 10.1323 5.46494 9.92701 5.0747 9.62773C4.68447 9.32845 4.36852 8.94321 4.15139 8.50196C4.33212 8.52662 4.514 8.54194 4.69631 8.54786C4.91289 8.55113 5.1249 8.48543 5.30169 8.36026C5.47847 8.23509 5.61086 8.05694 5.67971 7.85157C5.74569 7.64433 5.74229 7.42123 5.67004 7.2161C5.59778 7.01096 5.46061 6.83499 5.27932 6.71485C4.83947 6.42182 4.47916 6.02427 4.23068 5.5578C3.98219 5.09134 3.85328 4.57052 3.85549 4.04201C3.85549 3.97561 3.85744 3.9092 3.86135 3.84377C6.10261 5.93402 9.00967 7.16621 12.0703 7.32326C12.2248 7.32934 12.3787 7.30024 12.5203 7.23816C12.6619 7.17607 12.7875 7.08262 12.8877 6.96486C12.9869 6.84596 13.0571 6.70566 13.0929 6.55501C13.1286 6.40437 13.1289 6.24748 13.0937 6.0967C13.0366 5.85806 13.0074 5.61357 13.0068 5.36818C13.0077 4.51271 13.348 3.69254 13.9529 3.08764C14.5578 2.48274 15.378 2.14251 16.2334 2.14161C16.6736 2.14043 17.1092 2.2305 17.5127 2.40615C17.9163 2.5818 18.2791 2.8392 18.5781 3.16212C18.6935 3.2862 18.8386 3.37871 18.9998 3.43085C19.161 3.48299 19.3329 3.49303 19.499 3.46001C19.9098 3.38006 20.3147 3.2724 20.7109 3.13775C20.4407 3.69072 20.0953 4.20369 19.6846 4.66212Z' fill='#4164E2' />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='21' viewBox='0 0 20 21' fill='none'>
            <path d='M19 6.5V14.5C19 15.8261 18.4732 17.0979 17.5355 18.0355C16.5979 18.9732 15.3261 19.5 14 19.5H6C4.67392 19.5 3.40215 18.9732 2.46447 18.0355C1.52678 17.0979 1 15.8261 1 14.5V6.5C1 5.17392 1.52678 3.90215 2.46447 2.96447C3.40215 2.02678 4.67392 1.5 6 1.5H14C15.3261 1.5 16.5979 2.02678 17.5355 2.96447C18.4732 3.90215 19 5.17392 19 6.5Z' stroke='#4164E2' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M9 19.5V10.5C9 8.312 9.5 6.5 13 6.5' stroke='#4164E2' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M7 11.5H13' stroke='#4164E2' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
    );
}

function RedditIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='25' viewBox='0 0 24 25' fill='none'>
            <path d='M6.35054 10.6849C5.34012 9.77811 3.85574 9.7854 3.03543 10.7C2.2146 11.6146 2.35783 13.3161 3.51772 14.1542L6.35054 10.6849Z' fill='#F4F6FF' />
            <path d='M18.6495 10.6849C19.6594 9.77811 21.1438 9.7854 21.9646 10.7C22.785 11.6146 22.6428 13.3161 21.4818 14.1542L18.6495 10.6849Z' fill='#F4F6FF' />
            <path d='M19.9583 7.77865C20.9651 7.77865 21.7812 6.9625 21.7812 5.95573C21.7812 4.94896 20.9651 4.13281 19.9583 4.13281C18.9515 4.13281 18.1354 4.94896 18.1354 5.95573C18.1354 6.9625 18.9515 7.77865 19.9583 7.77865Z' fill='#F4F6FF' />
            <path d='M12.5443 22.1442C17.7464 22.1442 21.9635 19.1254 21.9635 15.4015C21.9635 11.6776 17.7464 8.65881 12.5443 8.65881C7.34215 8.65881 3.125 11.6776 3.125 15.4015C3.125 19.1254 7.34215 22.1442 12.5443 22.1442Z' fill='#F4F6FF' />
            <path d='M15.8152 15.7468C16.6448 15.7468 17.3173 15.0743 17.3173 14.2448C17.3173 13.4152 16.6448 12.7427 15.8152 12.7427C14.9856 12.7427 14.3131 13.4152 14.3131 14.2448C14.3131 15.0743 14.9856 15.7468 15.8152 15.7468Z' fill='#4164E2' />
            <path d='M9.18494 15.7468C10.0145 15.7468 10.687 15.0743 10.687 14.2448C10.687 13.4152 10.0145 12.7427 9.18494 12.7427C8.35537 12.7427 7.68286 13.4152 7.68286 14.2448C7.68286 15.0743 8.35537 15.7468 9.18494 15.7468Z' fill='#4164E2' />
            <path d='M12.5011 18.6781C10.8073 18.6781 9.30317 18.2901 8.33337 17.6875C8.86671 18.7521 10.5188 19.7708 12.5011 19.7708C14.4813 19.7708 16.1344 18.7521 16.6667 17.6875C15.6995 18.2901 14.1948 18.6781 12.5011 18.6781Z' fill='#4164E2' />
            <path d='M21.7866 14.5759L21.1772 13.7317C21.61 13.4192 21.8923 12.9212 21.9522 12.3655C22.0069 11.8551 21.8704 11.3744 21.5767 11.0473C21.2793 10.7155 20.8522 10.5317 20.3751 10.5296C19.8656 10.5394 19.3766 10.7318 18.997 11.0718L18.3011 10.2968C18.8744 9.78626 19.6123 9.49914 20.3798 9.48792C21.1548 9.49156 21.8553 9.79833 22.3517 10.3515C22.8423 10.8983 23.0741 11.6728 22.9876 12.477C22.8965 13.3259 22.459 14.0916 21.7866 14.5759Z' fill='#4164E2' />
            <path d='M3.21307 14.5759C2.5412 14.0905 2.10318 13.3254 2.01203 12.4764C1.92557 11.6728 2.15734 10.8983 2.64797 10.3519C3.14432 9.79882 3.84432 9.49205 4.61932 9.4884H4.63339C5.38391 9.4884 6.11724 9.77538 6.69849 10.2973L6.00266 11.0723C5.61047 10.7202 5.12297 10.5488 4.62453 10.5301C4.14745 10.5322 3.72089 10.716 3.42349 11.0478C3.13026 11.3749 2.99328 11.8551 3.04797 12.3655C3.10787 12.9212 3.39016 13.4191 3.82297 13.7322L3.21307 14.5759Z' fill='#4164E2' />
            <path d='M13.0209 9.27073H11.9792C11.9792 7.76812 11.9792 3.77698 14.5725 3.77698C15.6944 3.77698 16.2355 4.40771 16.6308 4.86864C16.9584 5.25094 17.1313 5.43427 17.4725 5.43427H18.186V6.47594H17.4725C16.6371 6.47594 16.1949 5.96031 15.8397 5.54625C15.4907 5.13948 15.2157 4.81812 14.572 4.81812C13.5287 4.81864 13.0209 6.27489 13.0209 9.27073Z' fill='#4164E2' />
            <path d='M12.5444 9.32804C17.4511 9.32804 21.4428 12.0525 21.4428 15.4015C21.4428 18.751 17.4511 21.4754 12.5444 21.4754C7.63758 21.4754 3.64591 18.751 3.64591 15.4015C3.64591 12.0525 7.63758 9.32804 12.5444 9.32804ZM12.5444 8.28638C7.05425 8.28638 2.60425 11.4718 2.60425 15.4015C2.60425 19.3317 7.05477 22.5171 12.5444 22.5171C18.0339 22.5171 22.4845 19.3317 22.4845 15.4015C22.4845 11.4718 18.0339 8.28638 12.5444 8.28638Z' fill='#4164E2' />
            <path d='M19.9584 4.65361C20.6766 4.65361 21.2605 5.23798 21.2605 5.95569C21.2605 6.6734 20.6766 7.25777 19.9584 7.25777C19.2401 7.25777 18.6563 6.6734 18.6563 5.95569C18.6563 5.23798 19.2401 4.65361 19.9584 4.65361ZM19.9584 3.61194C19.6505 3.61201 19.3457 3.67271 19.0613 3.79058C18.7769 3.90846 18.5185 4.08119 18.3009 4.29893C18.0832 4.51666 17.9106 4.77513 17.7929 5.05958C17.6751 5.34402 17.6146 5.64888 17.6146 5.95673C17.6147 6.26458 17.6754 6.56941 17.7933 6.8538C17.9111 7.1382 18.0839 7.39659 18.3016 7.61423C18.5193 7.83187 18.7778 8.00449 19.0623 8.12223C19.3467 8.23998 19.6516 8.30055 19.9594 8.30048C20.5812 8.30034 21.1774 8.05323 21.6169 7.61349C22.0565 7.17376 22.3033 6.57743 22.3032 5.95569C22.303 5.33395 22.0559 4.73773 21.6162 4.29819C21.1764 3.85865 20.5801 3.6118 19.9584 3.61194Z' fill='#4164E2' />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='18' height='21' viewBox='0 0 18 21' fill='none'>
            <path d='M15 14.58C14.24 14.58 13.56 14.88 13.04 15.35L5.91 11.2C5.96 10.97 6 10.74 6 10.5C6 10.26 5.96 10.03 5.91 9.8L12.96 5.69C13.5 6.19 14.21 6.5 15 6.5C16.66 6.5 18 5.16 18 3.5C18 1.84 16.66 0.5 15 0.5C13.34 0.5 12 1.84 12 3.5C12 3.74 12.04 3.97 12.09 4.2L5.04 8.31C4.5 7.81 3.79 7.5 3 7.5C1.34 7.5 0 8.84 0 10.5C0 12.16 1.34 13.5 3 13.5C3.79 13.5 4.5 13.19 5.04 12.69L12.16 16.85C12.11 17.06 12.08 17.28 12.08 17.5C12.08 19.11 13.39 20.42 15 20.42C16.61 20.42 17.92 19.11 17.92 17.5C17.92 15.89 16.61 14.58 15 14.58Z' fill='#4164E2' />
        </svg>
    );
}

import {
    useState,
    useEffect
} from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import ShareButtons from '../components/share-buttons';
import CopyText from '../components/copy-text';
import Score from '../components/score';
import Error from '../components/error';
import List from '../components/list';
import {
    getReportData
} from '../lib/valurank';

import reportStyles from './report.module.css';
import shareStyles from './share.module.css';

export default function Index() {
    const [error, setError] = useState('');
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        getReportData()
        .then((data) => {
            setReportData(data);
        })
        .catch((err) => {
            setError(String(err));
        });
    }, []);

    return (
        <>
            <Head>
                <title>
                    {'Valurank Report'}
                </title>
            </Head>

            <Layout>
                {
                    error &&
                    <Error
                        message={error}
                    />
                }
                {
                    reportData &&
                    <Report
                        data={reportData}
                    />
                }
            </Layout>
        </>
    );
}

function Report({data}) {
    const {
        hash,
        score
    } = data;
    const {
        outsideLinks
    } = data.meta;

    return (
        <>
            <div
                className={reportStyles.title}
            >
                {'Detailed report'}
            </div>
            <Share
                articleTitle={'Article Title'}
                score={score}
                reportURL={`https://valurank.com/report/${hash}`}
            />
            <Score
                score={score}
            />
            <List
                title={'Links to outside resourses'}
                data={outsideLinks}
                isLink={true}
            />
        </>
    );
}

function Share({
    articleTitle,
    score,
    reportURL
}) {
    return (
        <div
            className={shareStyles.container}
        >
            <div
                className={shareStyles.action}
            >
                {'Share with'}
            </div>
            <ShareButtons
                articleTitle={articleTitle}
                score={score}
                reportURL={reportURL}
            />
            <div
                className={shareStyles.separator}
            />
            <CopyText
                text={reportURL}
            />
        </div>
    );
}

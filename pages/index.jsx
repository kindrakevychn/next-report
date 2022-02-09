import {
    useState,
    useEffect
} from 'react';
import clsx from 'clsx';
import Head from 'next/head';
import Layout from '../components/layout';
import ShareButtons from '../components/share-buttons';
import CopyText from '../components/copy-text';
import Score from '../components/score';
import Error from '../components/error';
import List from '../components/list';
import ExtensionBanner from '../components/extension-banner';
import Indicators, {
    DetectedIndicator,
    ScoreIndicator
} from '../components/indicators';
import {
    getReportData,
    INDICATORS
} from '../lib/valurank';

import buttonStyles from '../styles/button.module.css';
import reportStyles from './report.module.css';
import shareStyles from './share.module.css';

export default function Index() {
    const [error, setError] = useState('');
    const [reportData, setReportData] = useState(null);

    useEffect(() => {
        const data = getReportData();
        setReportData(data);
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
    let {
        id,
        score,
        article,
        details
    } = data;

    article = article || {};
    details = details || {};

    const reportURL = `${document.location.origin}/${id}`;

    return (
        <>
            <Title
                articleTitle={article.title}
                articleURL={article.url}
            />
            <Share
                articleTitle={article.title}
                score={score}
                reportURL={reportURL}
            />
            <Data
                score={score}
                details={details}
            />
            <div
                className={reportStyles.bannerSeparator}
            />
            <ExtensionBanner />
        </>
    );
}

function Title({
    articleTitle,
    articleURL
}) {
    if (articleTitle && articleTitle.length > 400) {
        articleTitle = articleTitle.substring(0, 400) + "...";
    }

    return (
        <div
            className={reportStyles.title}
        >
            {'Detailed report'}
            {
                articleTitle &&
                <>
                    &nbsp;
                    {'on'}
                    &nbsp;
                    <span
                        className={reportStyles.articleTitle}
                    >
                        {
                            articleURL ?
                            <a
                                className={clsx(
                                    buttonStyles.button,
                                    reportStyles.articleLink
                                )}
                                href={articleURL}
                                target={'_blank'}
                                rel={'noreferrer noopener'}
                            >
                                {`"${articleTitle}"`}
                                <OpenInNewIcon />
                            </a> :
                            `"${articleTitle}"`
                        }
                    </span>
                </>
            }
        </div>
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

function Data({
    score,
    details
}) {
    return (
        <div
            className={reportStyles.row2}
        >
            <div
                className={reportStyles.col}
            >
                <Indicators>
                    {
                        (details.quality != null) &&
                        <ScoreIndicator
                            title={INDICATORS.quality.title}
                            score={details.quality.score}
                            max={INDICATORS.quality.maxScore}
                            status={details.quality.label}
                            description={INDICATORS.quality.description}
                        />
                    }
                    {
                        (details.biasedLanguage != null) &&
                        <ScoreIndicator
                            title={INDICATORS.biasedLanguage.title}
                            score={details.biasedLanguage.score}
                            max={INDICATORS.biasedLanguage.maxScore}
                            status={details.biasedLanguage.label}
                            description={INDICATORS.biasedLanguage.description}
                        />
                    }
                    {
                        (details.propagandaLikelihood != null) &&
                        <ScoreIndicator
                            title={INDICATORS.propagandaLikelihood.title}
                            score={details.propagandaLikelihood.score}
                            max={INDICATORS.propagandaLikelihood.maxScore}
                            status={details.propagandaLikelihood.label}
                            description={INDICATORS.propagandaLikelihood.description}
                        />
                    }
                    {
                        (
                            details.affiliatedLinks != null &&
                            Array.isArray(details.affiliatedLinks.data)
                        ) &&
                        <DetectedIndicator
                            title={INDICATORS.affiliatedLinks.title}
                            detected={!!details.affiliatedLinks.data.length}
                            count={details.affiliatedLinks.data.length}
                            description={INDICATORS.affiliatedLinks.description}
                        />
                    }
                    {
                        (details.hateSpeech != null) &&
                        <ScoreIndicator
                            title={INDICATORS.hateSpeech.title}
                            score={details.hateSpeech.score}
                            max={INDICATORS.hateSpeech.maxScore}
                            status={details.hateSpeech.label}
                            description={INDICATORS.hateSpeech.description}
                        />
                    }
                    {
                        (details.offensiveLanguage != null) &&
                        <ScoreIndicator
                            title={INDICATORS.offensiveLanguage.title}
                            score={details.offensiveLanguage.score}
                            max={INDICATORS.offensiveLanguage.maxScore}
                            status={details.offensiveLanguage.label}
                            description={INDICATORS.offensiveLanguage.description}
                        />
                    }
                    {
                        (details.tone != null) &&
                        <ScoreIndicator
                            title={INDICATORS.tone.title}
                            score={details.tone.score}
                            max={INDICATORS.tone.maxScore}
                            status={details.tone.label}
                            description={INDICATORS.tone.description}
                        />
                    }
                    {
                        (details.readability != null) &&
                        <ScoreIndicator
                            title={INDICATORS.readability.title}
                            score={details.readability.score}
                            max={INDICATORS.readability.maxScore}
                            description={INDICATORS.readability.description}
                        />
                    }
                </Indicators>
            </div>
            <div
                className={reportStyles.col}
            >
                <Score
                    score={score}
                />
                {
                    (
                        details.affiliatedLinks != null &&
                        Array.isArray(details.affiliatedLinks.data) &&
                        !!details.affiliatedLinks.data.length
                    ) &&
                    <List
                        title={INDICATORS.affiliatedLinks.title}
                        data={details.affiliatedLinks.data}
                        isLink={true}
                    />
                }
            </div>
        </div>
    );
}

function OpenInNewIcon() {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px'><path d='M0 0h24v24H0z' fill='none'/><path d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'/></svg>
    );
}

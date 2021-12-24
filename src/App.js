import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsBoxes from './components/NewsBoxes/NewsBoxes';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey='c94788108122fc2865680e1cddaa09ec2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const classes=useStyles();
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
                if(command==='newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command==='highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle+1);
                }
                else if(command==='open') {
                    const parsedNumber = number.length>2? wordsToNumbers(number, {fuzzy: true}) : number;
                    const article=articles[parsedNumber-1];
                    if(parsedNumber>20) {
                        alanBtn().playText('We have only twenty articles. Please try again.');
                    }
                    else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening the specified article...');
                    }
                }
            }
        })
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.logoContainer}>
                <img src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="Alan logo"/>
            </div>
            <NewsBoxes articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;
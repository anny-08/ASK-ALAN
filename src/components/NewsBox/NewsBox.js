import React, { useState, useEffect, createRef} from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';

const NewsBox = ({article: {description, publishedAt, source, title, url, urlToImage}, i, activeArticle}) => {
    const classes=useStyles();
    const [elemRefs, setElemRefs]=useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop-50);

    useEffect(() => {
        setElemRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if(i===activeArticle && elemRefs[activeArticle]) {
           scrollToRef(elemRefs[activeArticle]);
        }
    }, [i, activeArticle, elemRefs]);

    return (
        <Card ref={elemRefs[i]} className={classNames(classes.card, activeArticle===i? classes.activeBox : null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia className={classes.media} image={urlToImage || 'http://www.easy-businesssolutions.com/images/img_6.jpg'}/>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>{(new Date(publishedAt)).toDateString()}</Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>{source.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant='h5'>{title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>{description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary'>Learn More</Button>
                <Typography variant='h5' color='textSecondary'>{i+1}</Typography>
            </CardActions>
        </Card>
    );
}

export default NewsBox;
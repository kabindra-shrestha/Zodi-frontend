import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    content: {
        padding: '2rem 2rem !important',
        backgroundColor: theme.palette.card.background,
        borderRadius: '.3rem'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: 300,
        lineHeight: 1.2,
        marginBottom: '.5rem',
        marginTop: 0,
        display: 'block',
        marginBlockStart: '0.67em',
        marginBlockEnd: '0.67em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        color: theme.palette.text,
        textAlign: 'left'
    },
    quote: {
        fontSize: '1.25rem',
        fontWeight: 300,
        marginTop: 0,
        marginBottom: '1rem',
        display: 'block',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        lineHeight: 1.5,
        color: theme.palette.text,
        textAlign: 'left'
    },
    footer: {
        marginTop: 0,
        marginBottom: '1rem',
        display: 'block',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        color: theme.palette.text,
        textAlign: 'left'
    },
    space: {
        marginBottom: '1.5rem!important',
        marginTop: '1.5rem!important',
        border: 0,
        borderTop: '1px solid rgba(0,0,0,.1)',
        boxSizing: 'content-box',
        height: 0,
    }
}));

export default function Welcome(props) {
    const classes = useStyles();

    return (
        <Card className={classes.paper}>
            <CardContent className={classes.content}>
                <Typography className={classes.title} gutterBottom>
                    {props.heading}
                </Typography>
                <Typography className={classes.quote}>
                    {props.quote}
                </Typography>
                <hr className={classes.space}/>
                <Typography className={classes.footer}>
                    {props.footer}
                </Typography>
            </CardContent>
        </Card>
    );
}
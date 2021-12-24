import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: '0 5%',
        width: '100%',
        margin: 0
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '65vh',
        padding: '10%',
        border: '2px solid white',
        borderRadius: 10,
        color: 'white',
        marginBottom: 35
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    }
})

export default useStyles;
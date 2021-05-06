import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
        marginLeft: '10px'
    },
    headingText: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis !important',
        overflow: 'hidden !important',

    },
    jsonBody: {
        backgroundColor: '#eeeeee',
        fontSize: '16px'
    },
    headingContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px'
    },
    iconContainer: {
        padding: '7px 5px 5px 5px'
    },
    lineNumber: {
        paddingRight: '10px',
        color: '#3f51b5',
        borderRight: '1px solid #3f51b5'
    },
    wrapJson: {
        width: '100%'
    },
    avatarLineNumber: {
        height: '25px',
        width: '25px',
        fontSize: '0.75rem',
        backgroundColor: '#ADC8FF',
        color: 'black'
    },
}));

const LogLines = (props) => {
    const classes = useStyles()

    const isValidJson = (log) => {
        try {
            JSON.parse(log)
        }
        catch (err) {
            console.log(err)
            return false
        }
        return true
    }

    const renderAccordion = () => {
        return props.lines.map((log, index) => {
            if (isValidJson(log)) {
                return (
                    <>
                        <List className={classes.headingText}>
                            <ListItem >
                                <ListItemAvatar style={{ minWidth: '35px' }}>
                                    <Avatar className={classes.avatarLineNumber}>
                                        {index + 1}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    classes={{
                                        primary: classes.heading
                                    }}
                                    primary={log}
                                />
                            </ListItem>
                            <ReactJson src={JSON.parse(log)} displayDataTypes={false} collapsed={true} style={{ marginLeft: '60px', fontSize: '15px', fontWeight: 'bold', whiteSpace: 'pre-wrap' }} />
                            <Divider />
                        </List>
                    </>
                )
            }
        })
    }

    return (
        <>{renderAccordion()}</>
    )

}

export default LogLines;
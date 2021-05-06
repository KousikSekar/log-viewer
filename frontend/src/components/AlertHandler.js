import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { getLogsByServiceName } from "../api";
import { Icon } from '@material-ui/core';
import RefreshButton from '../assets/refresh.svg'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import LogLines from './common/LogLines';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '20px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        marginLeft: '10px'
    },
    headingContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px'
    },
    iconContainer: {
        padding: '7px 5px 5px 5px'
    },
    searchTextArea: {
        width: '400px',
    }
}));

export const AlertHandler = () => {
    const [logs, setLogs] = useState([])
    const [matchedLogLines, setMatchedLogLines] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState('')
    const classes = useStyles();


    useEffect(() => {
        callApi()
    }, [])

    const callApi = async () => {
        setIsLoading(true)
        setSearchText('')
        const response = await getLogsByServiceName('alerthandler')
        if (response.status === 200) {
            let AlertHandler = response.data.AlertHandler;
            if (AlertHandler !== null) {
                setLogs(AlertHandler);
                setMatchedLogLines(AlertHandler);
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        }
    }

    const updateSearchText = (event) => {
        if (event.key === 'Enter') {
            let matchedText = event.target.value
            setSearchText(matchedText)
            let tempLogs = [...logs]
            var matchedLogs = []
            // eslint-disable-next-line
            tempLogs.map((log) => {
                if (log.includes(matchedText)) {
                    matchedLogs.push(log)
                }
            })
            setMatchedLogLines(matchedLogs)
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.headingContainer}>
                <div style={{ display: 'flex' }}>
                    <Typography style={{ textAlign: 'center', fontWeight: '900', color: "#3f51b5" }} variant='h6'>AlertHandler Logs ({matchedLogLines.length} lines)
                    </Typography>
                    {
                        isLoading ?
                            <CircularProgress
                                style={{ marginLeft: '10px' }}
                                variant="indeterminate"
                                size={30}
                                thickness={4}
                                value={100}
                            />
                            :
                            <></>
                    }
                </div>
                <div>
                    <TextField className={classes.searchTextArea}
                        label="Search"
                        id="outlined-size-small"
                        size="small"
                        // onChange={updateSearchText}
                        onKeyDown={updateSearchText}
                    // value={searchText}
                    />

                    <Tooltip title="Reload Logs" aria-label="add">
                        <Icon
                            onClick={callApi}
                            style={{ cursor: 'pointer' }}
                            classes={{
                                root: classes.iconContainer
                            }}>
                            <img src={RefreshButton} height={30} width={30} alt="" />
                        </Icon>
                    </Tooltip></div>

            </div>
            <LogLines lines={matchedLogLines} />
        </div >
    );
}

export default AlertHandler;
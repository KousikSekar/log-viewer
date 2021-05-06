
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HealthChecker from './HealthChecker';
import WellnessManagement from './WellnessManagement';
import AlertHandler from './AlertHandler';
import AlertCollector from './AlertCollector';
import CorrelationEngine from './CorrelationEngine';
import CaseMappingService from './CaseMappingService';
import DeviceShadow from './DeviceShadow';
import DecisionEngine from './DecisionEngine';
import CrmService from './CrmService';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    <div>{children}</div>
                </>
            )}
        </div>
    );
}

const a11yProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabsBar: {
        boxShadow: 'none',
        backgroundColor: '#ADC8FF',
        color: '#3f51b'
    },
    tabs: {
        color: 'black !important',
        fontWeight: '600'
    }
}));

export const TabComponent = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.tabsBar}>
                <Tabs
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="healthChecker" {...a11yProps(0)} className={classes.tabs} />
                    <Tab label="alertCollector" {...a11yProps(1)} className={classes.tabs} />
                    <Tab label="alertHandler" {...a11yProps(2)} className={classes.tabs} />
                    <Tab label="deviceShadow" {...a11yProps(3)} className={classes.tabs} />
                    <Tab label="caseMapping" {...a11yProps(4)} className={classes.tabs} />
                    <Tab label="decisionEngine" {...a11yProps(5)} className={classes.tabs} />
                    <Tab label="correlationEngine" {...a11yProps(6)} className={classes.tabs} />
                    <Tab label="wellnessMgmnt" {...a11yProps(7)} className={classes.tabs} />
                    <Tab label="crmService" {...a11yProps(8)} className={classes.tabs} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <HealthChecker />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <AlertCollector />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <AlertHandler />
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                <DeviceShadow />
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
                <CaseMappingService />
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
                <DecisionEngine />
            </TabPanel>
            <TabPanel value={value} index={6} dir={theme.direction}>
                <CorrelationEngine />
            </TabPanel>
            <TabPanel value={value} index={7} dir={theme.direction}>
                <WellnessManagement />
            </TabPanel>
            <TabPanel value={value} index={8} dir={theme.direction}>
                <CrmService />
            </TabPanel>
        </div>
    );
}

export default TabComponent;
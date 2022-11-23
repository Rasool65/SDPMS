import React ,{Fragment} from 'react';
import {Link} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';

import config from './../../../config';

import logo from './../../../assets/images/logo.svg';

const LogoSection = () => {

    return (
        <Fragment>
            <Link component={RouterLink} to={config.defaultPath}>
                <img src={logo} alt="Berry" width="100" />
            </Link>
        </Fragment>
    );
};

export default LogoSection;

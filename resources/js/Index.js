import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import NavbarContent from './components/navbar'
import FooterContent from './components/footer'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';



export default class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <NavbarContent />
                    <div className="body-fullvh">
                        <Routes />
                    </div>

                    <div>
                        <FooterContent />
                    </div>
                </div>
            </Router>


        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Index />, document.getElementById('example'));
}

import React, { Component } from 'react';
import Auxiliary from '../hoc/auxiliary/auxiliary';
import BackDrop from '../back-drop/back-drop'
import styles from './withErrorHandler.module.scss'
const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Auxiliary>
                    <BackDrop show={this.state.error} clicked={this.errorConfirmedHandler}/>
                    <div className={styles.withErrorHandler} style={{display: this.state.error? 'block': 'none'}}><h1>{this.state.error ? this.state.error.message : null}</h1></div>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;
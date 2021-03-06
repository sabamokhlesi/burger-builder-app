import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../spinner/spinner'
import Input from '../input/input';
import styles from './auth.module.scss';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        isSignup:true,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup,};
        });
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input

                key={formElement.id}
                inputtype={formElement.config.elementType}
                elementconfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={formElement.config.valid}
                placeholder={formElement.config.elementConfig.placeholder}
                shouldvalidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <h3>Something went wrong! Please try again</h3>
            );
        }
        let authRedirect = null;
        if (this.props.isLogedIn) {
            authRedirect = <Redirect to='/'/>
        }
        return (
            <div className={styles.auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <button type="submit">SUBMIT</button>
                    <button onClick={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLogedIn: state.auth.token !== null
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
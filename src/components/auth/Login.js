import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderTextInput from '../layouts/RenderTextInput';
import { login, loadUser } from '../../actions';

const Login = ({ handleSubmit, login, loadUser, isAuthenticated, history }) => {
  useEffect(() => {
    loadUser();

    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated, loadUser]);

  return (
    <section className="section">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-12-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <h1 className="title" style={{ marginBottom: '12px' }}>
            Log In
          </h1>
          <hr className="is-divider" style={{ marginBlockStart: '0' }} />
          <form
            onSubmit={handleSubmit(value => {
              console.log(value);
              login(value);
            })}>
            <Field
              name="email"
              type="email"
              component={RenderTextInput}
              placeholder="Enter Email"
            />
            <Field
              name="password"
              type="password"
              component={RenderTextInput}
              placeholder="Enter Password"
            />
            <div className="control">
              <button className="button is-danger" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login, loadUser }
  // @ts-ignore
)(reduxForm({ form: 'login' })(Login));
import styles from './login-panel.module.css';
import InputField from '../../../../shared/components/ui/input-field/input-field.tsx';
import Button from '../../../../shared/components/ui/button/button.tsx';
import Form from '../../../../shared/components/form/form/form.tsx';
import AuthSidePanel from '../auth-side-panel/auth-side-panel.tsx';
import Checkbox from '../../../../shared/components/form/checkbox/checkbox.tsx';
import {Link} from 'react-router-dom';

const LoginPanel = () => {
  return (
      <>
        <Form>
          <h1 className={styles['header-title']}>Login</h1>
          <fieldset>
            <InputField form={true} formType={'email'} label={'Email'} required={true} />
            <InputField form={true} formType={'password'} label={'Password'} required={true} />
          </fieldset>
          <div className={styles['inline-options']}>
            <Checkbox id={'remember-me-id'} label={'Remember me?'} />
            <Link className={styles['link']} to={'/forgotpassword'}>Forgot your password?</Link>
          </div>
          <div className={styles['submit-wrapper']}>
            <Button text={'Login'} type={'form'} />
          </div>
        </Form>
        <AuthSidePanel>
          <h2 className={styles['header-title']}>Need an account?</h2>
          <p>Sign up to get started</p>
          <Button text={'Login'} variant={'outline'} type={'route-link'} to={'/signup'} />
        </AuthSidePanel>
      </>
  );
};

export default LoginPanel;
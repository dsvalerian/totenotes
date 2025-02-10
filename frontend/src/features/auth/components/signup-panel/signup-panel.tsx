import styles from './signup-panel.module.css';
import Button from '../../../../shared/components/ui/button/button.tsx';
import InputField from '../../../../shared/components/ui/input-field/input-field.tsx';
import Form from '../../../../shared/components/form/form/form.tsx';
import AuthSidePanel from '../auth-side-panel/auth-side-panel.tsx';

const SignupPanel = () => {
  return (
      <>
        <Form>
          <h1 className={styles['header-title']}>Sign up</h1>
          <fieldset>
            <InputField form={true} formType={'email'} label={'Email'} required={true} />
            <InputField form={true} formType={'password'} label={'Password'} required={true} />
            <p>
              Password must contain:<br/>- At least 10 characters<br/>- A number<br/>- A special character
            </p>
            <InputField form={true} formType={'password'} label={'Confirm password'} required={true} />
          </fieldset>
          <div className={styles['submit-wrapper']}>
            <Button text={'Sign up'} type={'form'} />
          </div>
        </Form>
        <AuthSidePanel>
          <h2 className={styles['header-title']}>Have an account?</h2>
          <p>Login to continue where you left off</p>
          <Button text={'Login'} variant={'outline'} type={'route-link'} to={'/login'} />
        </AuthSidePanel>
      </>
  );
};

export default SignupPanel;
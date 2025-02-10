import styles from './forgot-password-panel.module.css';
import Form from '../../../../shared/components/form/form/form.tsx';
import InputField from '../../../../shared/components/ui/input-field/input-field.tsx';
import Button from '../../../../shared/components/ui/button/button.tsx';
import AuthSidePanel from '../auth-side-panel/auth-side-panel.tsx';

const ForgotPasswordPanel = () => {
  return (
      <>
        <Form>
          <h1 className={styles['header-title']}>Forgot Password</h1>
          <fieldset>
            <p>You will retrieve further instructions to your email if it's associated with an account</p>
            <InputField form={true} formType={'email'} label={'Email'} required={true} />
          </fieldset>
          <div className={styles['submit-wrapper']}>
            <Button text={'Submit'} type={'form'} />
          </div>
        </Form>
        <AuthSidePanel>
          <h2 className={styles['header-title']}>Know your password?</h2>
          <p>Login to continue where you left off</p>
          <Button text={'Login'} variant={'outline'} type={'route-link'} to={'/login'} />
        </AuthSidePanel>
      </>
  );
};

export default ForgotPasswordPanel;
import styles from './signup-panel.module.css';
import FormTextInput from '../../../../shared/components/forms/form-text-input/form-text-input.tsx';
import FormSubmitButton from '../../../../shared/components/forms/form-submit-button/form-submit-button.tsx';
import Button from '../../../../shared/components/ui/button/button.tsx';

const SignupPanel = () => {
  return (
      <section className={styles['container']}>
        <div className={styles['login-panel']}>
          <h2>Already have an account?</h2>
          <p>Login to continue where you left off.</p>
          <Button text={'Login'} variant={'outline'} />
        </div>
        <form className={styles['form-panel']}>
          <h1 className={`${styles['full-width']} ${styles['main-title']}`}>Sign Up</h1>
          <FormTextInput id={'firstname'} label={'First name'} placeholder={'Your first name'} required={true} />
          <FormTextInput id={'lastname'} label={'Last name'} placeholder={'Your last name'} required={true} />
          <div className={styles['full-width']}>
            <FormTextInput id={'email'} label={'Email'} placeholder={'Your email address'} type={'email'} required={true} />
          </div>
          <div className={styles['full-width']}>
            <FormTextInput id={'password'} label={'Password'} placeholder={'Enter a password'} type={'password'} required={true} />
          </div>
          <div className={styles['full-width']}>
            <FormTextInput id={'confirmpassword'} label={'Confirm password'} placeholder={'Enter the same password'} type={'password'} required={true} />
          </div>
          <div className={`${styles['full-width']} ${styles['button-container']}`}>
            <FormSubmitButton text={'Sign Up'} />
          </div>
        </form>
      </section>
  );
};

export default SignupPanel;
import styles from './signup-panel.module.css';
import Button from '../../../../shared/components/ui/button/button.tsx';
import InputField from '../../../../shared/components/ui/input-field/input-field.tsx';

const SignupPanel = () => {
  return (
      <article className={styles['main-panel']}>
        <form className={styles['signup-form']} onSubmit={SignupPanel}>
          <h1 className={styles['header-title']}>Sign up</h1>
          <fieldset className={styles['input-fields']}>
            <InputField form={true} form-type={'text'} label={'First name'} />
            <InputField form={true} form-type={'text'} label={'Last name'} />
            <InputField form={true} form-type={'email'} label={'Email'} />
            <InputField form={true} form-type={'password'} label={'Password'} />
            <InputField form={true} form-type={'password'} label={'Confirm password'} />
          </fieldset>
          <div className={styles['submit-wrapper']}>
            <Button text={'Sign up'} form={true} />
          </div>
        </form>
        <section className={styles['login-redirect']}>
          <div className={styles['login-redirect-content']}>
            <h2 className={styles['header-title']}>Have an account?</h2>
            <p>Login to continue where you left off</p>
            <Button text={'Login'} variant={'outline'} />
          </div>
        </section>
      </article>
  );
};

export default SignupPanel;
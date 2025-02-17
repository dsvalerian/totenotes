import styles from './signup-panel.module.css';
import Button from '../../../../shared/components/ui/button/button.tsx';
import InputField from '../../../../shared/components/ui/input-field/input-field.tsx';
import Form from '../../../../shared/components/form/form/form.tsx';
import AuthSidePanel from '../auth-side-panel/auth-side-panel.tsx';
import {useMutation} from '@tanstack/react-query';
import {ApiResponse, createNewUser, UserCredentials} from '../../api/queries.ts';
import {useNavigate} from 'react-router-dom';
import {FormEvent, useState} from 'react';

const SignupPanel = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const createUserQuery = useMutation<ApiResponse, ApiResponse, UserCredentials>({
    mutationFn: createNewUser,
    onSuccess: (data: ApiResponse) => {
      console.info(data.message);

      if (data.success) {
        navigate("/login");
      }
      else {
        alert(data.message);
      }
    },
    onError: (error: ApiResponse) => {
      alert(error.message);
    },
  });

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserQuery.mutate({email, password});
  };

  return (
      <>
        <Form onSubmit={handleSignup}>
          <h1 className={styles['header-title']}>Sign up</h1>
          <fieldset>
            <InputField
                value={email}
                onChange={event => setEmail(event.target.value)}
                formType={'email'}
                label={'Email'}
                required={true}
            />
            <InputField
                value={password}
                onChange={event => setPassword(event.target.value)}
                formType={'password'}
                label={'Password'}
                required={true}
            />
            <p>
              Password must contain:<br/>- At least 10 characters<br/>- A number<br/>- A special character
            </p>
            <InputField
                value={passwordConfirm}
                onChange={event => setPasswordConfirm(event.target.value)}
                formType={'password'}
                label={'Confirm password'}
                required={true}
            />
          </fieldset>
          <div className={styles['submit-wrapper']}>
            <Button label={'Sign up'} type={'form'} />
          </div>
        </Form>
        <AuthSidePanel>
          <h2 className={styles['header-title']}>Have an account?</h2>
          <p>Login to continue where you left off</p>
          <Button label={'Login'} variant={'outline'} type={'route-link'} to={'/login'} />
        </AuthSidePanel>
      </>
  );
};

export default SignupPanel;
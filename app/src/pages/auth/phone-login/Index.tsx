import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { history } from 'umi';
import InputPhoneNumber from './components/InputPhoneNumber';
import InputVerifyCode from './components/InputVerifyCode';
import { hasLogged } from '@/utils/client';

enum Step {
  inputPhoneNumber,
  inputVerifyCode,
}

export default function Index() {
  const [state, setState] = useSetState({
    phoneNumber: '',
    session: '',
    step: Step.inputPhoneNumber,
    tick: 0,
  });

  const onLogged = (next: 'redirect' | 'register') => {
    if (next === 'register') {
      history.push({
        pathname: '/auth/register',
      });
    } else {
      const redirect = history.location.query?.redirect?.toString();
      if (redirect) {
        if (redirect.startsWith('http')) {
          if (typeof window !== 'undefined') {
            //@ts-ignore
            window.location = redirect;
          }
        } else {
          history.push(redirect);
        }
      } else {
        history.goBack();
      }
    }
  };

  if (hasLogged()) {
    onLogged('redirect');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.tick > 0) {
        setState({ tick: state.tick - 1 });
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {
        [
          <InputPhoneNumber
            currentCodeSentPhoneNumber={state.phoneNumber}
            onNothingChanged={() =>
              setState({
                step: Step.inputVerifyCode,
              })
            }
            onVerifyCodeSent={(phoneNumber, session) => {
              setState({
                phoneNumber: phoneNumber,
                session: session,
                step: Step.inputVerifyCode,
                tick: 60,
              });
            }}
          />,
          <InputVerifyCode
            onBack={() => setState({ step: Step.inputPhoneNumber })}
            onLogged={onLogged}
            onResent={(session) => {
              setState({ session: session, tick: 60 });
            }}
            phoneNumber={state.phoneNumber}
            session={state.session}
            tick={state.tick}
          />,
        ][state.step]
      }
    </>
  );
}

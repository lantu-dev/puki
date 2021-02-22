import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import InputPhoneNumber from './components/input-phone-number';
import InputVerifyCode from './components/input-verify-code';

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
            onLogged={console.log}
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

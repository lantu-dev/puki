import React, { useEffect, useState } from 'react';
import InputPhoneNumber from './components/input-phone-number';
import InputVerifyCode from './components/input-verify-code';

enum Step {
  inputPhoneNumber,
  inputVerifyCode,
}

export default function Index() {
  const [step, setStep] = useState(Step.inputPhoneNumber);
  const [tick, setTick] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [session, setSession] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tick) {
        if (tick > 0) {
          setTick(tick - 1);
        } else {
          setTick(null);
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      {step === Step.inputPhoneNumber ? (
        <InputPhoneNumber
          currentCodeSentPhoneNumber={phoneNumber}
          onNothingChanged={() => setStep(Step.inputVerifyCode)}
          onVerifyCodeSent={(phoneNumber, session) => {
            setPhoneNumber(phoneNumber);
            setSession(session);
            setTick(60);
            setStep(Step.inputVerifyCode);
          }}
        />
      ) : null}
      {step === Step.inputVerifyCode ? (
        <InputVerifyCode
          tick={tick}
          onLogged={console.log}
          onBack={() => setStep(Step.inputPhoneNumber)}
          onResent={(session) => {
            setSession(session);
            setTick(60);
          }}
          phoneNumber={phoneNumber}
          session={session}
        />
      ) : null}
    </>
  );
}

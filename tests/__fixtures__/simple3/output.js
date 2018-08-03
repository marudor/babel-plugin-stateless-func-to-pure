// @flow
import DOMConfetti from 'react-dom-confetti';
import React from 'react';

const config = (right?: boolean) => ({
  angle: right ? 200 : 315,
  spread: 60,
  startVelocity: 32,
  elementCount: 80,
  decay: 0.95
});

type Props = {
  active: boolean,
  right?: boolean,
};

class Confetti extends React.PureComponent<Props> {
  render() {
    const {
      active,
      right
    }: Props = this.props;
    return <DOMConfetti active={active} config={config(right)} />;
  }

}

export default Confetti;

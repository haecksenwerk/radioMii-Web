import PropTypes from 'prop-types';

import { SwitchButton, SwitchInput, SwitchLabel } from './ToggleSwitch.styles';

export default function ToggleSwitch({ id, defaultChecked, onChange }) {
  return (
    <>
      <SwitchInput
        className='switch-checkbox'
        id={id}
        type='checkbox'
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <SwitchLabel className='switch-label' htmlFor={id}>
        <SwitchButton className='switch-button' />
      </SwitchLabel>
    </>
  );
}

ToggleSwitch.propTypes = {
  id: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  toggled: PropTypes.bool,
};

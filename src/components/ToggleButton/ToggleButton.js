import { Wrapper, ButtonChecked, ButtonUnchecked } from './ToggleButton.styles';

export default function ToggleButton({
  IconOutline,
  IconFilled,
  size = 16,
  checked,
  cbClicked,
  highlight = true,
}) {
  return (
    <Wrapper
      size={size}
      onClick={() => {
        cbClicked(!checked);
      }}
    >
      <ButtonChecked checked={checked} $highlight={highlight}>
        <IconFilled size={size} />
      </ButtonChecked>
      <ButtonUnchecked checked={checked}>
        <IconOutline size={size} />
      </ButtonUnchecked>
    </Wrapper>
  );
}

import { Wrapper, HeartFilled, HeartEmpty } from './ToggleHeart.styles';

export default function ToggleHeart({ checked, cbClicked }) {
  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
        cbClicked(!checked);
      }}
    >
      <HeartFilled size={24} checked={checked} />
      <HeartEmpty size={24} checked={checked} />
    </Wrapper>
  );
}

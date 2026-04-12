import { useState } from 'react';
import { useAppStore } from '../../store';
import { useSettingsStore } from '../../store';

import { Wrapper, Badge } from './Tooltip.styles';

export default function Tooltip(props) {
  const [active, setActive] = useState(false);
  const showTooltips = useSettingsStore((state) => state.showTooltips);
  const system = useAppStore((state) => state.system);

  return (
    <Wrapper
      onMouseEnter={() => setActive(true && showTooltips && !system.isTouch)}
      onMouseLeave={() => setActive(false)}
    >
      {props.children}
      {active && !props.hide && (
        <Badge
          className={`Badge ${props.direction || 'top'}`}
          fgColor={props.fgColor}
          $bgColor={props.bgColor}
          $margin={props.margin}
          $delay={props.delay}
        >
          {props.content}
        </Badge>
      )}
    </Wrapper>
  );
}

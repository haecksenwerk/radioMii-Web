// This component is based on Ryan Finni's article on building a segmented control:
// https://letsbuildui.dev/articles/building-a-segmented-control-component

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Controls, Input, Segment } from './SegControl.styles';

import { useId } from 'react';

export default function SegControl({
  name,
  segWidth,
  padding,
  fontSize,
  bgColor,
  segActiveColor,
  fontColor,
  fontActiveColor,
  segments,
  cbSelect,
  cbHover,
  index = 0,
  controlRef,
}) {
  const [activeIndex, setActiveIndex] = useState(index);

  const componentReady = useRef();
  const inputId = useId();

  useEffect(() => {
    componentReady.current = true;
  }, []);

  useEffect(() => {
    setActiveIndex(index);
  }, [index]);

  useEffect(() => {
    const activeSegRef = segments[activeIndex].ref;
    const { offsetWidth, offsetLeft } = activeSegRef.current;
    const { style } = controlRef.current;

    style.setProperty('--active-width', `${offsetWidth}px`);
    style.setProperty('--active-x-pos', `${offsetLeft}px`);
  }, [activeIndex, cbSelect, segments, controlRef]);

  function onInputChange(value, index) {
    setActiveIndex(index);
    cbSelect(value, index);
  }

  function onInputEnter(value, index, active) {
    cbHover && cbHover(value, index, active);
  }

  return (
    <Wrapper ref={controlRef}>
      <Controls
        $ready={componentReady.current}
        padding={padding}
        $bgColor={bgColor}
        segActiveColor={segActiveColor}
        onMouseLeave={() => onInputEnter(undefined, 0, false)}
      >
        {segments?.map((item, i) => (
          <Segment
            $segWidth={segWidth}
            fontSize={fontSize}
            $fontColor={fontColor}
            fontActiveColor={fontActiveColor}
            key={item.value}
            $active={i === activeIndex ? true : false}
            ref={item.ref}
          >
            <Input
              type='radio'
              value={item.value}
              id={inputId + i}
              name={name}
              onMouseEnter={() => onInputEnter(item.value, i, true)}
              onChange={() => onInputChange(item.value, i)}
              checked={i === activeIndex}
            />
            <label htmlFor={inputId + i}>{item.label}</label>
          </Segment>
        ))}
      </Controls>
    </Wrapper>
  );
}

SegControl.propTypes = {
  name: PropTypes.string.isRequired,
  segments: PropTypes.array.isRequired,
  cbHover: PropTypes.func,
  cbSelect: PropTypes.func.isRequired,
  controlRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  index: PropTypes.number,
};

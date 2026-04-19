import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  IoThumbsUpSharp,
  IoPlaySharp,
  IoLockClosedSharp,
} from 'react-icons/io5';
import { isHttps } from '../../utils/system';
import { compactFormatter } from '../../utils/string';
import { StationLabel } from './StationLabels.styles';

function StationLabels({ station, viewMode, VIEW, tags, maxTags }) {
  const visibleTags = maxTags !== undefined ? tags.slice(0, maxTags) : tags;

  const showStats =
    viewMode !== VIEW.FAVORITES && station.type !== 'web-radio-db';

  return (
    <>
      {showStats && (
        <>
          <StationLabel color='cornflowerblue'>
            <IoThumbsUpSharp />
            {' '}
            {compactFormatter.format(station.votes)}
          </StationLabel>
          <StationLabel color='#fa7d18'>
            <IoPlaySharp />
            {compactFormatter.format(station.clickcount)}
          </StationLabel>
        </>
      )}
      {station.countrycode && (
        <StationLabel color='#F08787'>{station.countrycode}</StationLabel>
      )}
      {isHttps(station.url) && (
        <StationLabel color='mediumseagreen'>
          <IoLockClosedSharp />
        </StationLabel>
      )}
      {station.codec && (
        <StationLabel color='darkorchid'>
          {station.codec + ' ' + station.bitrate}
        </StationLabel>
      )}
      {visibleTags.map((tag, idx) => (
        <StationLabel key={idx}>{tag}</StationLabel>
      ))}
    </>
  );
}

StationLabels.propTypes = {
  station: PropTypes.object.isRequired,
  viewMode: PropTypes.number.isRequired,
  VIEW: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  maxTags: PropTypes.number,
};

export default memo(StationLabels);

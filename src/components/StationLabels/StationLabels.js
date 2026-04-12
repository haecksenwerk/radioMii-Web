import { memo } from 'react';
import PropTypes from 'prop-types';
import {
  IoThumbsUpSharp,
  IoPlaySharp,
  IoLockClosedSharp,
} from 'react-icons/io5';
import { isHttps } from '../../utils/system';
import { compactFormatter } from '../../utils/string';
import { Label } from '../shared/shared.styles';

/**
 * Renders the metadata label strip for a station (votes, country code, https, codec, tags).
 *
 * Props:
 *   station   — station data object
 *   viewMode  — current VIEW mode value
 *   VIEW      — VIEW constants object
 *   tags      — pre-computed tags array (avoids recomputing in parent + here)
 *   maxTags   — max number of genre tags to render (default: unlimited)
 */
function StationLabels({ station, viewMode, VIEW, tags, maxTags }) {
  const visibleTags = maxTags !== undefined ? tags.slice(0, maxTags) : tags;

  const showStats =
    viewMode !== VIEW.FAVORITES && station.type !== 'web-radio-db';

  return (
    <>
      {showStats && (
        <>
          <Label color='cornflowerblue'>
            <IoThumbsUpSharp />
            {'\u00A0'}
            {compactFormatter.format(station.votes)}
          </Label>
          <Label color='#fa7d18'>
            <IoPlaySharp />
            {compactFormatter.format(station.clickcount)}
          </Label>
        </>
      )}
      {station.countrycode && (
        <Label color='#F08787'>{station.countrycode}</Label>
      )}
      {isHttps(station.url) && (
        <Label color='mediumseagreen'>
          <IoLockClosedSharp />
        </Label>
      )}
      {station.codec && (
        <Label color='darkorchid'>
          {station.codec + ' ' + station.bitrate}
        </Label>
      )}
      {visibleTags.map((tag, idx) => (
        <Label key={idx}>{tag}</Label>
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

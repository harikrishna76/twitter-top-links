import React, { useState, useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import { fetchLocations } from '../../actions/locations';
import s from './SearchHeader.css';

function SearchHeader({ onFiltersChange }) {
  useStyles(s);

  const [showLocationFilters, setShowLocationFilters] = useState(false);
  const [locations, setLocations] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [hashtag, setHashtag] = useState('');

  const populateLocationFilters = async () => {
    const response = await fetchLocations();
    setLocations(response);
  };

  const handleLocationChange = location => {
    const filters = { ...selectedLocations };
    if (filters[location.name]) {
      delete filters[location.name];
    } else {
      filters[location.name] = true;
    }
    setSelectedLocations(filters);
  };

  const handleFiltersChange = (clear = true) => {
    if (clear) {
      setSelectedLocations({});
    }
    onFiltersChange({ locations: selectedLocations });
  };

  useEffect(() => {
    populateLocationFilters();
  }, []);

  useEffect(() => {
    if (!hashtag) {
      onFiltersChange({ hashtag: '' });
    }
  }, [hashtag]);

  return (
    <div className={s.root}>
      <div className={s.inputAndFilter}>
        <input
          placeholder="Search tweets by hashtag"
          onChange={event => setHashtag(event.target.value || '')}
          onKeyDown={event =>
            event.key === 'Enter' && onFiltersChange({ hashtag })
          }
        />
        <img
          src="/filter.png"
          alt=""
          width="32px"
          onClick={() => locations && setShowLocationFilters(prev => !prev)}
          role="presentation"
          className={(!locations && s.disabled) || ''}
        />
      </div>
      {showLocationFilters && (
        <div className={s.locationFilters}>
          Filter tweets by following locations:
          <div className={s.filters}>
            {(locations || []).map(location => (
              <div key={`wrapper${location._id}`} className={s.filterItem}>
                <label htmlFor={location._id}>
                  <input
                    type="checkbox"
                    id={location._id}
                    name=""
                    value={location.name}
                    onChange={() => handleLocationChange(location)}
                    checked={Boolean(selectedLocations[location.name])}
                  />
                  <span>{location.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className={s.actionButtons}>
            <button type="button" onClick={handleFiltersChange}>
              Clear
            </button>
            <button type="button" onClick={() => handleFiltersChange(false)}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(SearchHeader);

SearchHeader.propTypes = {
  onFiltersChange: PropTypes.func.isRequired,
};

SearchHeader.defaultProps = {};

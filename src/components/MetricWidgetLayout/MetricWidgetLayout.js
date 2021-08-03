import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';
import s from './MetricWidgetLayout.css';
import Loader from '../Loader';

export default function MetricWidgetLayout({
  title,
  children,
  greyVersion,
  loading,
  stripsCount,
  stripHeight,
  maxItemsOnCollapse,
}) {
  useStyles(s);

  console.log('values', title, stripsCount, stripHeight);

  const canCollapse = Boolean(stripsCount > maxItemsOnCollapse && stripHeight);

  const [collapse, setCollapse] = useState(true);

  const getStyles = () => {
    const style = {};
    if (loading) {
      style.background = '#fff';
    }
    console.log('canCollapse', canCollapse, collapse);
    if (canCollapse && collapse) {
      console.log('canCollapse', canCollapse);
      style.maxHeight = `${maxItemsOnCollapse * stripHeight}px`;
      style.overflow = 'hidden';
    }
    return style;
  };

  return (
    <div className={`${s.root} ${greyVersion ? s.greyVersion : ''}`}>
      <div className={s.header}>{title}</div>
      <div
        className={`${s.body} ${(loading || stripsCount === 0) && s.loading}`}
        style={getStyles()}
      >
        {loading ? <Loader /> : children}
        {!loading && stripsCount === 0 && <div>No data found</div>}
      </div>
      {canCollapse && (
        <div
          className={s.collapseToggle}
          role="presentation"
          onClick={() => setCollapse(!collapse)}
        >
          {collapse ? 'Show' : 'Hide'} more
        </div>
      )}
    </div>
  );
}

MetricWidgetLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  greyVersion: PropTypes.bool,
  loading: PropTypes.bool,
  stripsCount: PropTypes.number,
  stripHeight: PropTypes.number,
  maxItemsOnCollapse: PropTypes.number,
};

MetricWidgetLayout.defaultProps = {
  greyVersion: false,
  loading: false,
  stripsCount: 0,
  stripHeight: 0,
  maxItemsOnCollapse: 4,
};

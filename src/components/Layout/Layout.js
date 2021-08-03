import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import LeftNavigation from '../LeftNavigation/LeftNavigation';
import MetricsPanel from '../MetricsPanel';

export default function Layout({ children, showHeader }) {
  useStyles(s, normalizeCss);
  return (
    <div className={showHeader && s.root}>
      {showHeader && <LeftNavigation />}
      <div className={showHeader && s.container}>{children}</div>
      {showHeader && <MetricsPanel />}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showHeader: PropTypes.bool,
};

Layout.defaultProps = {
  showHeader: true,
};

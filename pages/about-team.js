/* eslint no-param-reassign: ["error", { "props": false }] */
/* global BACKEND_URL, fetch */

import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

import Layout from '../components/layout/main';
import Background from '../components/content/background';
import Ship from '../components/pages/about/ship-item';

const getSpaceships = team => team.map((t) => <Ship key={nanoid()}
                                                    ship={t}
                                                    worker={t}/>);

export default class AboutTeam extends React.Component {
  static propTypes = {
    url: PropTypes.object,
    team: PropTypes.array,
  };

  static defaultProps = {
    url: {},
    team: [],
  };

  static getInitialProps = async () => {
    const response = await fetch(`${BACKEND_URL}/team-list`);
    const team = await response.json();
    return { team };
  };

  render() {
    const { url, team } = this.props;

    return (
      <Layout currentURL={url}>
        <div className="team-page page">
          <div className="team-page-content">
            <h1 className="team-page-title">Team <span>Astronaut office</span></h1>
            <div className="ships">
              <div className="ship-columns">
                {getSpaceships(team)}
              </div>
            </div>
          </div>
          <Background className="open-source-page-background" />
        </div>
      </Layout>
    );
  }
}

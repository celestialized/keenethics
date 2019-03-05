/* global fetch */

import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout/main';
import Background from '../components/content/background';

import Works from '../components/portfolio/works';
import CategoriesFilter from '../components/categories-filter/CategoriesFilter';

import { works } from '../main.config';

const flatten = deepArray => deepArray.reduce((a, b) => a.concat(b), []);

const transformateCategories = (chosenCategory, existCategories) => {
  const categories = existCategories.filter(existCategory =>
    chosenCategory.filter(category =>
      category.toLowerCase() === existCategory.toLowerCase()).length);

  return categories.length ? categories : existCategories;
};

export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.getCategoriesList(props.url),
    };

    this.worksCountFor = this.worksCountFor.bind(this);
    this.filterOnChange = this.filterOnChange.bind(this);
  }

  componentDidMount() {
    const subnavigation = document.querySelector('.navigation-item.current > .subnavigation');
    subnavigation.style.display = 'none';
    subnavigation.parentElement.classList.add('is-link');
  }

  getCategoriesList(url) {
    const chosenCategory = url.query.chosen;
    const categories = works
      .map(work => work.category.main)
      .reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []); // flatten
    const uniqCategories = [...new Set(categories)];

    const selectedWorks = chosenCategory ? transformateCategories(chosenCategory.split(','), uniqCategories)
      : uniqCategories;

    return { selectedWorks, categorisList: uniqCategories };
  }

  worksCountFor(work) {
    const { selectedWorks } = this.state;
    return work.category.main.filter(category => selectedWorks.includes(category)).length;
  }

  filterOnChange(selectedWorks) {
    this.setState({ selectedWorks });
  }

  render() {
    const { url } = this.props;
    const { selectedWorks, categorisList } = this.state;
    return (
      <Layout currentURL={url}>
        <section className="portfolio">
          <Background className="portfolio__background" />
          <div className="portfolio__header">
            <h1 className="portfolio__title">Portfolio</h1>
          </div>
          <CategoriesFilter
            categorisList={categorisList}
            selectedCategories={selectedWorks}
            filterOnChange={this.filterOnChange}
            pageTitle="portfolio"
          />
          {
            works.length
              ? <Works works={works.filter(this.worksCountFor)} />
              : null
          }
        </section>
      </Layout>
    );
  }
}


Portfolio.propTypes = {
  url: PropTypes.object,
};

Portfolio.defaultProps = {
  url: {},
};

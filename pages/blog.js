import { withRouter } from "next/router";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Layout from "../components/layout/main";
import Posts from "../components/blog/posts";
import CategoriesFilter from "../components/categories-filter/CategoriesFilter";
import Pagination from "../components/pagination";
import { getPostsList, getAllCategories } from "../lib/contentful";
import SubscribeModal from "../components/subscribeModal";

const _ = require("lodash");

const RESULTS_PER_PAGE = 8;

const BellIcon = () => (
  <svg fill="none" viewBox="0 0 27 33" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.4 26.87c1-.07 1.32-.23 1.3-.45-.02-.38-.4-.99-.8-1.62a7.04 7.04 0 0 1-1.07-2.16c-.3-1.42-.4-3.07-.5-4.8-.35-5.74-.76-12.42-8.82-12.24h-.07c-8.01-.16-8.42 6.5-8.77 12.24-.1 1.73-.2 3.38-.5 4.8-.14.72-.6 1.45-1.06 2.16-.4.63-.8 1.24-.81 1.62-.02.22.3.38 1.3.45h19.8zm2.6-.53c.06 1-.54 1.7-2.5 1.83H3.6a.7.7 0 0 1-.05 0c-2-.13-2.6-.83-2.55-1.83.05-.7.53-1.46 1.02-2.23.39-.62.79-1.25.89-1.73.27-1.32.37-2.93.47-4.61.39-6.31.84-13.65 10.07-13.47h.05c9.28-.2 9.73 7.14 10.12 13.47.1 1.68.2 3.29.47 4.6.1.5.5 1.12.9 1.74.48.77.96 1.52 1 2.23z"
      fill="#6677B4"
      stroke="#6677B4"
    />
    <path
      d="M17.8 27.53a4.31 4.31 0 1 1-8.6 0c0-.36.3-.65.65-.65H17.16c.36 0 .65.3.65.65zm-2.17 2.14c.4-.4.69-.91.81-1.49h-5.87a3.01 3.01 0 0 0 5.06 1.49zM10.44 4.73a.65.65 0 1 0 1.3 0V2.74a.8.8 0 0 1 .8-.8h1.9a.8.8 0 0 1 .8.8v2a.65.65 0 1 0 1.3 0v-2a2.1 2.1 0 0 0-2.1-2.1h-1.9a2.1 2.1 0 0 0-2.1 2.1v2z"
      fill="#6677B4"
      stroke="#6677B4"
    />
  </svg>
);

const Blog = ({ router, url, allCategories }) => {
  const [selectedPostsCategories, setSelectedPostsCategories] = useState(
    allCategories
  );
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function getPosts() {
      const contResp = await getPostsList({
        limit: RESULTS_PER_PAGE,
        skip,
        categories:
          selectedPostsCategories.length < allCategories.length
            ? selectedPostsCategories
            : allCategories
      });

      setPosts(contResp && contResp.items ? contResp.items : []);
      setTotal(contResp && contResp.total ? contResp.total : 0);
      setSkip(contResp && contResp.skip ? contResp.skip : 0);
    }

    getPosts();
  }, [selectedPostsCategories, skip]);

  function filterOnChange(selectedPostsCategories) {
    setSkip(0);
    setSelectedPostsCategories(selectedPostsCategories);
  }

  function subscribeModalHandler(event) {
    event.preventDefault();

    setModalOpen(true);
  }

  return (
    <Layout currentURL={router.current}>
      <div className="blog-page">
        <SubscribeModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <div className="blog-page-header">
          <h1>
            <span className="text-color-red">Keen</span>{" "}
            <a
              className="text-decoration-none"
              href="#"
              onClick={event => subscribeModalHandler(event)}
            >
              <span className="text-undelined text-color-blue">Blog</span>{" "}
              <BellIcon />
            </a>
            <br />
            on Tech and business
          </h1>
        </div>
        <div className="blog-page-content">
          <CategoriesFilter
            categorisList={allCategories}
            selectedCategories={selectedPostsCategories}
            filterOnChange={filterOnChange}
            pageTitle="blog"
          />
          {!posts.length ? (
            <div className="blog-loading">Loading...</div>
          ) : (
            <Posts posts={posts} />
          )}
        </div>
        <div className="text-center">
          <Pagination
            total={total}
            skip={skip}
            limit={RESULTS_PER_PAGE}
            onPageChange={({ skip }) => setSkip(skip)}
          />
        </div>
      </div>
    </Layout>
  );
};

Blog.getInitialProps = async () => {
  const categoriesEntries = (await getAllCategories()).items;
  const allCategories = categoriesEntries.reduce((acc, item) => {
    if (item && item.fields && item.fields.categories)
      return [...acc, ...item.fields.categories];

    return acc;
  }, []);

  return {
    allCategories: _.uniq(allCategories)
  };
};

Blog.propTypes = {
  url: PropTypes.object,
  router: PropTypes.object,
  posts: PropTypes.array
};

Blog.defaultProps = {
  url: {},
  router: {},
  posts: []
};

export default withRouter(Blog);

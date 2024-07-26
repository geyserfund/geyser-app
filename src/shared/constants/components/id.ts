/* Listed map of element ID used for different tags across the paltform */
export const ID = {
  root: 'app-route-content-root',
  landing: {
    filters: {
      wrapper: 'landing-page-filters-wrapper',
      body: 'landing-page-filters',
    },
    leaderboard: {
      wrapper: 'landing-page-leaderboard-wrapper',
      body: 'landing-page-leaderboard',
    },
  },
  leaderboard: {
    wrapper: 'mobile-leaderboard-wrapper',
    body: 'mobile-leaderboard-body',
  },
  project: {
    activity: {
      feedtabWrapper: 'project-activity-feed-tab-wrapper',
      feedtab: 'project-activity-feed-tab',
      supporterModal: 'project-supporter-modal',
      contribution: 'project-activity-list-container',
      leaderboard: 'project-leaderboard-list-container',
      contributors: 'project-contributors-list-container',
      rewards: {
        wrapper: 'project-rewards-wrapper',
        body: 'project-rewards-body',
      },
    },
    story: {
      markdown: {
        container: 'project-story-markdown-container',
      },
    },
    details: {
      container: 'project-details-container',
    },
    rewards: {
      container: 'project-rewards-container',
      title: 'project-rewards-title',
    },
    creator: {
      contributor: {
        tableContainer: 'project-contributor-table-container',
      },
    },
  },
  profile: {
    tabs: 'user-profile-tab-container',
    tabList: 'user-profile-tab-List',
  },
  entry: {
    editEntryScrollContainer: 'edit-entry-scroll-container',
  },
}

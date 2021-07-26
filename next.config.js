const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "masaokaka",
        mongodb_password: "masaokaka0302",
        mongodb_clustername: "cluster0",
        mongodb_database: "events-dev",
      },
    };
  } else if (phase === PHASE_PRODUCTION_BUILD) {
    return {
      env: {
        mongodb_username: "masaokaka",
        mongodb_password: "masaokaka0302",
        mongodb_clustername: "cluster0",
        mongodb_database: "events",
      },
    };
  }
};

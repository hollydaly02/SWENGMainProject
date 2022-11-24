// /**
//  * @param {string} owner Owner of repo
//  * @param {string} repo Name of repo
//  * @returns {number} Number of total commits the repo contains on main master branch
//  */
// export const getTotalCommits = (owner, repo) => {
//   let url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`;
//   let pages = 0;

//   return fetch(url, {
//     headers: {
//       Accept: "application/vnd.github.v3+json",
//     },
//   })
//     .then((data) => data.headers)
//     .then(
//       (result) =>
//         result
//           .get("link")
//           .split(",")[1]
//           .match(/.*page=(?<page_num>\d+)/).groups.page_num
//     )
//     .then((numberOfPages) => {
//       pages = numberOfPages;
//       return fetch(url + `&page=${numberOfPages}`, {
//         headers: {
//           Accept: "application/vnd.github.v3+json",
//         },
//       }).then((data) => data.json());
//     })
//     .then((data) => {
//       return data.length + (pages - 1) * 100;
//     })
//     .catch((err) => {
//       console.log(`ERROR: calling: ${url}`);
//       console.log("See below for more info:");
//       console.log(err);
//     });
// };

// getTotalCommits("facebook", "react").then((commits) => {
//   console.log(commits);
// });

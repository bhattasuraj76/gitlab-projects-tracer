const GITLAB_API_URL = "https://gitlab.lenden.app/api/v4/";
const GITLAB_PERSONAL_TOKEN = "L2v6uhFxdK8FiT7ZSHeX";

//instantiate fetch projects
fetchProjects();

//fetch projects
function fetchProjects() {
  fetch(`${GITLAB_API_URL}projects?private_token=${GITLAB_PERSONAL_TOKEN}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let html = "";
      data.forEach((each, index) => {
        html += `<li class="project-list-item" data-project-id="${each.id}">${each.name}</li>`;
      });
      html = `<ul>${html}</ul>`;
      document.getElementById("project-list").innerHTML = html;

      let listItems = document.getElementsByClassName("project-list-item");
      for (each of listItems) {
        each.addEventListener("click", fetchProjectMembers);
      }
    })
    .catch((err) => console.log(err));
}

//fetch project members
function fetchProjectMembers(event) {
  const projectListItem = event.target;
  console.log(projectListItem);

  const projectId = projectListItem.dataset.projectId;
  if (!projectId) return;

  fetch(
    `${GITLAB_API_URL}projects/${projectId}/members?private_token=${GITLAB_PERSONAL_TOKEN}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let html = "";
      data.forEach((each, index) => {
        html += `<li class="member-list-item" data-project-id="${each.id}">${each.name}</li>`;
      });
      html = `<ul class="member-list">${html}</ul>`;
      projectListItem.insertAdjacentHTML("beforeend", html);
      projectListItem.removeEventListener("click", fetchProjectMembers);
    })
    .catch((err) => console.log(err));
}

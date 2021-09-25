import Project from '~/models/project/Project';

export default {
  addProject (state: any, project: Project) {
    state.projects.push(project);
  },
  cleanProjects (state: any) {
    state.projects = [];
  }
};

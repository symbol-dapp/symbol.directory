import Project from '~/models/project/Project';

export default {
  addProject (state: any, project: Project) {
    if (state.projects.some((p: Project) => p.state.name === project.state.name)) {
      return;
    }
    state.projects.push(project);
  },
  cleanProjects (state: any) {
    state.projects = [];
  }
};

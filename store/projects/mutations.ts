import Project from '~/models/project/Project';
import RemoveProjectCommand from '~/models/project/RemoveProjectCommand';
import { UpdateSocialCommand } from '~/models/project/UpdateSocialMediaCommand';
import { Review } from '~/models/review/Review';

export default {
  addProject (state: any, project: Project) {
    if (state.projects.some((p: Project) => p.state.name === project.state.name)) {
      return;
    }
    state.projects.push(project);
  },
  cleanProjects (state: any) {
    state.projects = [];
  },
  addReview (state: any, { id, review }: {id: string, review: Review}) {
    const project = state.projects.find((project: Project) => project.state.name === id);
    project.addReview(review);
  },
  removeProject (state: any, removeProjectCommand: RemoveProjectCommand) {
    const project = state.projects.find((project: Project) => project.state.name === removeProjectCommand.id);
    if (project.owner.equals(removeProjectCommand.signer)) {
      state.projects = state.projects.filter((project: Project) => project.state.name !== removeProjectCommand.id);
    }
  },
  updateSocialMedia (state: any, command: UpdateSocialCommand) {
    const project: Project = state.projects.find((project: Project) => project.state.name === command.id);
    project.updateSocialMedia(command.data);
  }
};

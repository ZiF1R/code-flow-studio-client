import axios from "@/utils/axios";
import {
  type DefaultTemplates,
  type UserTemplates
} from "@/utils/types/global.types";

export const createNewProject = async (data) => {
  const response = await axios.put("projects", data);
  return response.data?.project;
}

export const getRecentProjects = async (page: number) => {
  // TODO: change userId
  const response = await axios.get("projects/recent", {
    params: { userId: 1, page }
  });
  return response.data?.projects;
}

export const getProject = async (projectName: string) => {
  const response = await axios.get("projects/" + projectName, {
    params: { userId: 1 }
  }).catch((e) => e);

  if (response.data) {
    return response.data?.project;
  } else {
    return null;
  }
}

export const fetchDefaultTemplates = async (): Promise<DefaultTemplates> => {
  const response = await axios.get("templates/default");
  return response.data?.templates;
}

export const fetchUserTemplates = async (): Promise<UserTemplates> => {
  const response = await axios.get("templates/user", {
    params: { userId: 1 }
  });
  return response.data?.templates;
}

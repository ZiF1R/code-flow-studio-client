import axios from "@/utils/axios";
import {
  type DefaultTemplates,
  type UserTemplates
} from "@/utils/types/global.types";

export const createNewProject = async (data) => {
  const response = await axios.put("projects", data);
  return response.data?.project;
}

export const getAllProjects = async (userId: number) => {
  const response = await axios.get("projects", {
    params: { userId }
  });
  return response.data?.projects;
}

export const getTemplates = async (userId: number) => {
  const response = await axios.get("projects/templates", {
    params: { userId }
  });
  return response.data?.templates;
}

export const getRecentProjects = async (page: number, userId: number) => {
  const response = await axios.get("projects/recent", {
    params: { userId, page }
  });
  return response.data?.projects;
}

export const getProject = async (projectName: string, userId: number) => {
  const response = await axios.get("projects/code-names/" + projectName, {
    params: { userId }
  });

  if (response.data) {
    return {
      project: response.data?.project,
      filesTree: response.data?.filesTree
    };
  } else {
    return null;
  }
}

export const fetchDefaultTemplates = async (): Promise<DefaultTemplates> => {
  const response = await axios.get("templates/default");
  return response.data?.templates;
}

export const fetchUserTemplates = async (userId: number): Promise<UserTemplates> => {
  const response = await axios.get("templates/user", {
    params: { userId }
  });
  return response.data?.templates;
}

export const getProjectRoom = async (projectName: string) => {
  const response = await axios.get("projects/rooms/" + projectName);
  return response.data?.room;
}

export const openFile = async (projectName: string, path: string) => {
  const response = await axios.get("projects/files", {
    params: {
      projectName,
      path,
    }
  });

  return response.data?.content;
}

export const updateVisitDate = async (projectId: number, userId: number) => {
  await axios.post("projects/visited", {
    projectId,
    userId,
    timeStamp: Date.now(),
  });
}

export interface Skill {
  id: number;
  name: string;
}

export interface Resource {
  id: string;
  name: string;
  role: string;
  email: string;
  skills: Array<Skill>;
}

export async function fetchResources(): Promise<Resource[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/resources`);
  const data = await response.json();
  return data;
}

let resourceController: AbortController | null = null;

export async function fetchResource(id: string): Promise<Resource> {
  if (resourceController) resourceController.abort();
  resourceController = new AbortController();
  const signal = resourceController.signal;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/resources/${id}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Invalid resource ID");
  }

  const data = await response.json();

  return data;
}

let skillsController: AbortController | null = null;

export async function fetchResourceSkills(id: string): Promise<Skill[]> {
  if (skillsController) skillsController.abort();
  skillsController = new AbortController();
  const signal = skillsController.signal;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/resources/${id}/skills`,
    { signal },
  );

  if (!response.ok) {
    return [];
  } else {
    const data = await response.json();
    return data;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/skills`);
  const data = await response.json();
  return data;
}

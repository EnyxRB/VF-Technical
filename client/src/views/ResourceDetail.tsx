import { useState, useEffect } from "react";
import {
  Resource,
  Skill,
  fetchResource,
  fetchResourceSkills,
} from "../helpers/fetchFromAPI";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import Toggle from "../components/Toggle";

function ResourceDetail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();

  const { id } = useParams();
  const [resource, setResource] = useState({} as Resource);
  const [skills, setSkills] = useState([] as Skill[]);
  const [resourceLoaded, setResourceLoaded] = useState(false as boolean);
  const [skillsLoaded, setSkillsLoaded] = useState(false as boolean);
  const [activeMenu, setActiveMenu] = useState("Overview" as string);

  function updateActiveMenu(menu: string) {
    setActiveMenu(menu);
    setSearchParams({ ...searchParams, menu: menu });
  }

  useEffect(() => {
    setResource({} as Resource);
    setSkills([] as Skill[]);
    setResourceLoaded(false);
    setSkillsLoaded(false);

    fetchResource(id || "")
      .then((resource) => {
        setResource(resource);
        setResourceLoaded(true);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log("Failed to get resource");
          navigate("/");
        }
      });

    fetchResourceSkills(id || "")
      .then((skills) => {
        setSkills(skills);
        setSkillsLoaded(true);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log("Resource has no skills...");
        }
      });
  }, [id, navigate]);

  useEffect(() => {
    if (searchParams.get("menu") === "Skills") {
      setActiveMenu("Skills");
    } else {
      setActiveMenu("Overview");
    }
  }, [searchParams]);

  return (
    <>
      {resourceLoaded ? (
        <>
          <div className="flex">
            <div>
              <div className="flex h-[55px] w-[55px] justify-center rounded-full bg-gray-200 p-3 text-xl font-medium">
                <div className="m-auto text-center">
                  {resource.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n) => n[0])}
                </div>
              </div>
            </div>
            <div className="ml-3 pt-3">
              <div className="mb-10 text-xl">{resource.name}</div>
              <div className="mb-8">
                <Toggle
                  toggles={["Overview", "Skills"]}
                  value={activeMenu}
                  callback={updateActiveMenu}
                />
              </div>

              {activeMenu === "Overview" ? (
                <>
                  <div className="mb-4">
                    <div>Role</div>
                    <div className="text-lg font-medium">{resource.role}</div>
                  </div>

                  <div className="mb-4">
                    <div>Email</div>
                    <div className="text-lg font-medium">{resource.email}</div>
                  </div>
                </>
              ) : activeMenu === "Skills" && skillsLoaded ? (
                <>
                  {skills.length > 0 ? (
                    <ul className="ml-6 list-disc text-lg">
                      {skills.map((skill) => (
                        <li key={"skill-" + skill.id}>{skill.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-lg">No skills found...</div>
                  )}
                </>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ResourceDetail;

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Toggle from "./Toggle";
import { fetchResources } from "../helpers/fetchFromAPI";
import { useDispatch, useSelector } from "react-redux";
import { initResources } from "../redux/ResourceReducer";
import { RootState } from "../redux";

function Navigation() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [sort, setSort] = useState("A-Z" as string);
  const [resources, setResources] = useState(
    [] as { id: string; name: string }[],
  );

  const resourceState = useSelector(
    (state: RootState) => state.resources.resources,
  );

  function sortResources(value: string) {
    setSort(value);

    if (value === "A-Z") {
      setResources(resources.sort((a, b) => a.name.localeCompare(b.name)));
    } else if (value === "Z-A") {
      setResources(resources.sort((a, b) => b.name.localeCompare(a.name)));
    }
  }

  useEffect(() => {
    fetchResources()
      .then((resources) => {
        setResources(resources.sort((a, b) => a.name.localeCompare(b.name)));
        dispatch(initResources(resources));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const newResources = [...resourceState];

    if (sort.length > 0) {
      if (sort === "A-Z") {
        setResources(newResources.sort((a, b) => a.name.localeCompare(b.name)));
      } else if (sort === "Z-A") {
        setResources(newResources.sort((a, b) => b.name.localeCompare(a.name)));
      }
    }
  }, [resourceState]);

  return (
    <>
      <div className="bg-vf-secondary relative h-screen w-[500px] px-4 py-4">
        <Link to="/">
          <div className="mb-6 mt-4 flex">
            <div className="bg-vf-primary rounded-md p-3 text-2xl font-medium uppercase text-white">
              VF
            </div>
            <div className="my-auto ml-2 text-2xl font-medium uppercase">
              Resourcing
            </div>
          </div>
        </Link>

        <div className="my-4 h-0.5 w-full bg-gray-200"></div>

        <div className="relative ml-3 flex">
          <div className="text-xl">Sort</div>
          <div className="absolute right-1">
            <Toggle
              toggles={["A-Z", "Z-A"]}
              value={sort}
              callback={sortResources}
            />
          </div>
        </div>

        <div className="my-4 h-0.5 w-full bg-gray-200"></div>

        <div className="my-6 max-h-[70%] overflow-y-auto">
          {resources.map((resource) => (
            <Link
              to={`/resource/${resource.id}?menu=Overview`}
              key={resource.id}
            >
              <div
                className={
                  "cursor-pointer py-1.5 pl-3 text-xl font-medium" +
                  (resource.id === id
                    ? " bg-vf-primary/15 border-vf-primary/30 rounded-md border"
                    : " border-vf-secondary border")
                }
              >
                {resource.name}
              </div>
            </Link>
          ))}
        </div>

        <Link to={"/resource/create"}>
          <div className="bg-vf-primary hover:bg-vf-primary/80 absolute bottom-6 ml-3 inline-block cursor-pointer rounded-md px-5 py-2 align-bottom font-semibold text-white transition-colors">
            + New Resource
          </div>
        </Link>
      </div>
    </>
  );
}

export default Navigation;

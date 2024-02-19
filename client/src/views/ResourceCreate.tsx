import { useState, useEffect } from "react";
import { Skill, fetchSkills } from "../helpers/fetchFromAPI";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { addResource } from "../redux/ResourceReducer";

function ResourceCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [skills, setSkills] = useState([] as Skill[]);
  const [skillsLoaded, setSkillsLoaded] = useState(false as boolean);
  const [saving, setSaving] = useState(false as boolean);

  type FormValues = {
    firstname: string;
    lastname: string;
    role: string;
    email: string;
    skills: string[] | false;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstname: "",
      lastname: "",
      role: "",
      email: "",
      skills: false,
    },
  });
  const createResource: SubmitHandler<FormValues> = (formData) => {
    setSaving(true);

    let skillIDs: number[] | false = false;

    if (formData.skills !== false) {
      skillIDs = formData.skills.map(function (item) {
        return parseInt(item);
      });
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname:
          formData.firstname.charAt(0).toUpperCase() +
          formData.firstname.slice(1),
        lastname:
          formData.lastname.charAt(0).toUpperCase() +
          formData.lastname.slice(1),
        role: formData.role,
        email: formData.email,
        skills: skillIDs,
      }),
    };
    fetch(`${process.env.REACT_APP_API_URL}/resources`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(
          addResource({
            id: data.id,
            name: formData.firstname + " " + formData.lastname,
          }),
        );
        navigate(`/resource/${data.id}?menu=Overview`);
      });
  };

  useEffect(() => {
    setSkillsLoaded(false);

    fetchSkills()
      .then((skills) => {
        setSkills(skills);
        setSkillsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {skillsLoaded ? (
        <>
          <p className="mt-2 text-xl font-medium">Create New Resource</p>

          <form
            onSubmit={handleSubmit(createResource)}
            className="mt-6 max-w-[500px]"
          >
            <div className="mb-2 grid grid-cols-2 gap-5">
              <div>
                <Input
                  label="First Name"
                  props={register("firstname", { required: true })}
                />
                {errors.firstname && (
                  <div className="text-sm text-red-600">
                    First name is required
                  </div>
                )}
              </div>
              <div>
                <Input
                  label="Last Name"
                  props={register("lastname", { required: true })}
                />
                {errors.lastname && (
                  <div className="text-sm text-red-600">
                    Last name is required
                  </div>
                )}
              </div>
            </div>

            <div className="mb-2 grid grid-cols-2 gap-5">
              <div>
                <Input
                  label="Role"
                  props={register("role", { required: true })}
                />
                {errors.role && (
                  <div className="text-sm text-red-600">Role is required</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <Input
                  label="Email"
                  props={register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-sm text-red-600">
                    Please enter a valid email
                  </div>
                )}
              </div>
            </div>

            <p className="mt-8 font-medium">Skills</p>
            {errors.skills && (
              <div className="text-sm text-red-600">
                Please select at least one skill
              </div>
            )}
            <div className="mt-4">
              {skills.map((skill) => (
                <div key={skill.id} className="my-2 flex">
                  <input
                    className="my-auto mr-4 h-5 w-5 cursor-pointer"
                    type="checkbox"
                    value={skill.id}
                    {...register("skills", { required: true })}
                  />
                  <label className="text-xl">{skill.name}</label>
                </div>
              ))}
            </div>

            <button
              className="bg-vf-primary/20 hover:bg-vf-primary/30 border-vf-primary/10 absolute bottom-6 m-auto flex h-[40px] w-[120px] cursor-pointer justify-center rounded-md border px-10 py-2 text-center align-bottom font-medium transition-colors"
              disabled={saving}
            >
              {saving ? (
                <div className="mini-loader m-auto mt-[0px]"></div>
              ) : (
                "Save"
              )}
            </button>
          </form>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default ResourceCreate;

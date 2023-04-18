import firebase from "firebase/compat/app";
import "firebase/compat/database";
import React, { useState } from "react";

const firebaseConfig = {
  // Config
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();

interface Resume {
  first_name: string;
  last_name: string;
  region: string;
  skills: string;
  current_pos: string;
  experient_in_currnet_pos: number;
  wanted_pos: string;
  linked_in_url: string;
}

const Page = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [region, setRegion] = useState("");
  const [skill, setSkill] = useState("");
  const [curr_pos, setCurrPos] = useState("");
  const [exp, setExp] = useState<number>(0);
  const [want_pos, setWantPos] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const handleExpChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = Number(event.target.value);
    setExp(value);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const trimmedFirstName = firstname.trim();
    // console.log("trimmedFirstName", trimmedFirstName);
    const trimmedLastName = lastname.trim();
    // console.log("trimmedLastName", trimmedLastName);
    const trimmedRegion = region.trim();
    // console.log("trimmedRegion", trimmedRegion);
    const trimmedSkill = skill.trim();
    // console.log("trimmedSkill", trimmedSkill);
    const trimmedcurr_pos = curr_pos.trim();
    // console.log("trimmedcurr_pos", trimmedcurr_pos);
    const trimmedwant_pos = want_pos.trim();
    // console.log("trimmedwant_pos", trimmedwant_pos);
    // const trimmedLinkedin = linkedin.trim();
    // console.log("trimmedLinkedin", trimmedLinkedin);
    if (
      !(
        (
          trimmedFirstName &&
          trimmedLastName &&
          trimmedRegion &&
          trimmedSkill &&
          trimmedcurr_pos &&
          trimmedwant_pos
        )
        // trimmedLinkedin
      )
    ) {
      // message is empty or contains only whitespace characters
      return console.log("Error: Please fill all details");
      setIsUploading(false);
    }

    const timestamp = firebase.database.ServerValue.TIMESTAMP;

    const sessionEmail = sessionStorage.getItem("email");
    if (sessionEmail) {
      setEmail(sessionEmail);
    } else {
      console.log("Session Email is empty");
    }

    const data = {
      sessionEmail,
      firstname,
      lastname,
      region,
      skill,
      curr_pos,
      exp,
      want_pos,
      linkedin,
      timestamp,
    };
    firebase
      .database()
      .ref("resume")
      .push(data)
      .then(() => {
        console.log("Message sent successfully");
        setEmail("");
        setFirstName("");
        setLastName("");
        setRegion("");
        setSkill("");
        setCurrPos("");
        setExp(0);
        setWantPos("");
        setLinkedin("");
      })
      .catch((error) => {
        console.error("Error sending resume: ", error);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <div className="bg-neutral-100 min-w-screen min-h-screen text-black p-20">
      <div className="flex flex-row">
        <div className="flex flex-col w-min">
          <div>This is Upload Resume</div>
          <form onSubmit={handleUpload}>
            <label>First Name:</label>
            <input
              type="text"
              name="First Name"
              className="bg-gray-200"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last Name:</label>
            <input
              type="text"
              name="Last Name"
              className="bg-gray-200"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Region:</label>
            <input
              type="text"
              name="Last Name"
              className="bg-gray-200"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <label>Skill (separate by comma):</label>
            <input
              type="text"
              name="Last Name"
              className="bg-gray-200"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />

            <label>Current Position:</label>
            <input
              type="text"
              name="Current Position"
              value={curr_pos}
              className="bg-gray-200"
              onChange={(e) => setCurrPos(e.target.value)}
            />

            <label>Experience in Current Position (Years):</label>
            <input
              type="number"
              name="Experience in Current Position (Years)"
              value={exp}
              className="bg-gray-200"
              onChange={handleExpChange}
            />

            <label>Wanted Position:</label>
            <input
              type="text"
              name="Wanted Position"
              value={want_pos}
              className="bg-gray-200"
              onChange={(e) => setWantPos(e.target.value)}
            />

            <label>LinkedIn URL:</label>
            <input
              type="text"
              name="LinkedIn URL"
              value={linkedin}
              className="bg-gray-200"
              onChange={(e) => setLinkedin(e.target.value)}
            />

            <button
              className="text-white w-full mt-2 mb-2 mr-2 p-2 bg-gradient-to-r from-blue-800 to-violet-700 rounded-lg font-bold h-min"
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "UPLOAD RESUME"}
            </button>
          </form>
        </div>
        <div className="px-20">
          <div>Your Resume</div>
          <div className="w-[600px] h-full border border-gray-200 rounded-lg "></div>
        </div>
      </div>
    </div>
  );
};

export default Page;

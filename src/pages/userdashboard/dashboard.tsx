import Image from "next/image";
import linkInImage from "/public/LinkedInImage.png";
import React, { useState, useEffect } from "react";
import sanitizeHtml from "sanitize-html";
import Link from "next/link";
// import { auth } from "../auth/loginconfig";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  // Config
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

interface Candidate {
  firstname: string;
  lastname: string;
  region: string;
  skill: string[];
  curr_pos: string;
  exp: number;
  want_pos: string;
  linkedin: string;
  sessionEmail?: string;
}
interface CandidateData {
  [key: string]: Candidate;
}

const UserDash = () => {
  const [data, setData] = useState<Candidate[]>([]);

  const fetchData = () => {
    fetch("functionurl")
      .then((response) => response.json())
      .then((data: CandidateData) => {
        const candidates = Object.values(data); // convert the object to an array of Candidate objects
        auth.onAuthStateChanged((currentUser) => {
          const filteredData = candidates.filter(
            (candidate: Candidate) =>
              candidate.sessionEmail?.trim() == currentUser?.email
          );
          //   console.log(typeof currentUser?.email);
          //   setCurrentUserEmail(currentUser!.email!);
          //   console.log(currentUserEmail);
          setData(filteredData);
          // console.log(filteredData);
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  if (!data) return null;

  const ResumeElements: JSX.Element[] = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      const LinkedInDisaply = () => {
        if (item.linkedin == "") {
          return;
          <div>No LinkedIn Profile</div>;
        } else {
          return (
            <Image
              src={linkInImage}
              alt="LinkedIn Profile"
              width={25}
              height={25}
            />
          );
        }
      };

      const skillList = () => {
        let skillraw = "";
        let skill_split = [];
        let skillstyled = ``;
        skillraw += item.skill;
        skill_split = skillraw.split(",");
        const sanitizedSkills = skill_split.map((skill) =>
          sanitizeHtml(skill.trim(), {
            allowedTags: ["div"],
            allowedAttributes: {
              div: ["className"],
            },
          })
        );
        const skillElements = sanitizedSkills.map((skill, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg w-min h-min px-2 mb-1 mr-1"
          >
            {skill}
          </div>
        ));

        return <div className="flex">{skillElements}</div>;
      };
      ResumeElements.push(
        <div
          key={key}
          className="flex flex-row rounded-lg font-poppins border border-gray-300 p-4 mt-3 w-min"
        >
          <div className="flex flex-col border border-gray-300 w-min p-2 rounded-lg items-center">
            <div className="flex flex-row">
              {" "}
              <h2 className="w-min h-min font-bold text-black w-20 text-center rounded-lg px-2 text-[20px]">
                {item.firstname}&nbsp;{item.lastname}
              </h2>
              <a href={item.linkedin} className="ml-2 mt-0.5">
                <p className="w-[25px] text-center text-blue-700 w-min">
                  {LinkedInDisaply()}
                </p>
              </a>
            </div>
            <div className="text-black h-min mt-3">
              {" "}
              Region:{" "}
              <span className="text-white bg-gradient-to-r from-violet-400 to-violet-500 rounded-lg px-2 h-min mt-3">
                {item.region}
              </span>
            </div>
          </div>
          <div className="flex row border border-gray-300 w-min p-2 rounded-lg ml-2">
            <p className="min-w-[350px] inline-flex flex-wrap mt-1 text-gray-100">
              <div className="mt-2 flex flex-row items-center">
                <div className="text-black">Current Position:&nbsp;</div>
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg px-2">
                  {item.curr_pos}
                </span>
              </div>
              <div className="mt-2 flex flex-row items-center">
                <div className="text-black">
                  Experience on Currnet Position:
                </div>
                <span className="text-black px-2">{item.exp} years</span>
              </div>
              <div className="mt-2 flex flex-row items-center">
                <div className="text-black">Skills:&nbsp;</div>
                <span className="flex px-2">{skillList()}</span>
              </div>
            </p>
          </div>
          <div className="flex row border border-gray-300 w-min p-2 rounded-lg ml-2">
            <p className="w-[350px] inline-flex flex-wrap mt-1 text-gray-100">
              {" "}
              <div className="mt-2 flex flex-row">
                <div className="text-black">Wanted Position:&nbsp;</div>
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg px-2 h-min">
                  {item.want_pos}
                </span>
              </div>
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="px-20 py-5 flex">
      <div className="bg-gradient-to-r from-blue-100 to-violet-100 rounded-[20px] p-10">
        <Link
          href="/uploadResume/uploadform"
          className="text-[20px] bg-gradient-to-r from-sky-500 to-violet-600 rounded-full p-3 py-2 drop-shadow-md text-center text-white font-semibold"
        >
          {" "}
          Upload resume{" "}
        </Link>
        <p className="mt-2">Your Resume Submissions</p>
        <div>{ResumeElements}</div>
      </div>
    </div>
  );
};

export default UserDash;

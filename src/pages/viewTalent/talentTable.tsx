import Image from "next/image";
import linkInImage from "/public/LinkedInImage.png";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { stringify } from "querystring";
import sanitizeHtml from "sanitize-html";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const databaseRef = firebase.database().ref();

// Reference to the specific location you want to fetch data from
// const dataRef = databaseRef.child("path/to/data");

interface Candidate {
  firstname: string;
  lastname: string;
  region: string;
  skill: string[];
  curr_pos: string;
  exp: number;
  want_pos: string;
  linkedin: string;
  sessionEmail: string;
}

const TalentMain = () => {
  const [data, setData] = useState<Candidate[]>([]);

  const fetchData = () => {
    fetch("functionurl")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // console.log(data);
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
        }
        if (sessionStorage.getItem("usertype") == "recruiter") {
          return (
            <a href={item.linkedin} className="ml-2 mt-0.5">
              <p className="w-[20px] text-center text-blue-700 w-min">
                <Image
                  src={linkInImage}
                  alt="LinkedIn Profile"
                  width={20}
                  height={20}
                />
              </p>
            </a>
          );
        } else {
          return (
            <div>
              {" "}
              <Image
                src={linkInImage}
                alt="LinkedIn Profile"
                width={20}
                height={20}
              />
            </div>
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
              <h2 className="w-min h-min font-bold text-black w-20 text-center rounded-lg px-2 text-[20px] blur">
                {item.firstname}
              </h2>
              {/* <a href={item.linkedin} className="ml-2 mt-0.5">
                <p className="w-[20px] text-center text-blue-700 w-min">
                  {LinkedInDisaply()}
                </p>
              </a> */}
              <div className="w-[20px]">{LinkedInDisaply()}</div>
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
    <div className="min-w-screen min-h-screen bg-white text-black px-20 py-5 grid justify-items-center">
      <div className="w-[300px] bg-gradient-to-r from-blue-500 to-violet-500 px-2 rounded-lg text-[20px] text-white text-center h-min">
        Candidate List
      </div>
      <p>Top talents are waiting for your call!</p>
      <p>
        Only recruiters can see candidates&apos; name and have access to
        LinkedIn Links.
      </p>

      <div>{ResumeElements}</div>
    </div>
  );
};

export default TalentMain;

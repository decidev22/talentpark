import React from "react";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  // config
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const resumeRef = ref(db, "resume");

interface FrequencyPos {
  [key: string]: number;
}

const JobDemand = () => {
  const [mostFrequentCurrentPos, setMostFrequentCurrentPos] =
    useState<FrequencyPos>({});
  const [mostFrequentWantedPos, setMostFrequentWantedPos] =
    useState<FrequencyPos>({});

  useEffect(() => {
    // Define an object to store the count of each column
    const counts = {
      current_pos: {},
      wanted_pos: {},
    };
    const want_pos_freq: FrequencyPos = {};
    const curr_pos_freq: FrequencyPos = {};
    // Retrieve the 'resume' data
    get(resumeRef).then((snapshot) => {
      // Get the value of the 'resume' data
      const resumeData = snapshot.val();

      // Iterate over each item in the 'resume' data
      Object.values(resumeData).forEach((item: any) => {
        // Iterate over each column in the current item

        if (curr_pos_freq[item["curr_pos"]]) {
          curr_pos_freq[item["curr_pos"]]++;
        } else {
          curr_pos_freq[item["curr_pos"]] = 1;
        }
        if (want_pos_freq[item["want_pos"]]) {
          want_pos_freq[item["want_pos"]]++;
        } else {
          want_pos_freq[item["want_pos"]] = 1;
        }

        setMostFrequentCurrentPos(curr_pos_freq);
        setMostFrequentWantedPos(want_pos_freq);
        // console.log(mostFrequentCurrentPos);
      });
    });
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-row">
      <div className="font-bold text-black flex flex-row mt-10 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-[50px] justify-self-start min-w-[250px] min-h-[250px] drop-shadow-lg mr-5 overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent text-[18px] p-10 w-full">
          <div className="flex justify-center">
            <div className="">
              <p>People on Talent Park are working in...</p>
              {Object.entries(mostFrequentCurrentPos).map(([key, value]) => (
                <p key={key} className="text-[15px] text-black">
                  {key}: {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold text-black flex flex-row mt-10 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-[50px] justify-self-start min-w-[250px] min-h-[250px] drop-shadow-lg ml-5 overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent text-[18px] p-10 w-full">
          <div className="flex justify-center">
            <div className="">
              {" "}
              <p>People on Talent Park are Looking for...</p>
              {Object.entries(mostFrequentWantedPos).map(([key, value]) => (
                <p key={key} className="text-[15px] text-black">
                  {key}: {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDemand;

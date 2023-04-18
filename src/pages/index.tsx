import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import JobDemand from "./analytics/job_demand";

const inter = Inter({ subsets: ["latin"] });
import React, { Component } from "react";
import ReactTextTransition, { presets } from "react-text-transition";

const texts = ["Show Your Talent", "Hire Best Talent", "Don't wait for it"];
const randomNumber = () => Math.floor(Math.random() * 9999999999 + 100000);

class MainBoardText extends React.Component {
  state = {
    number: randomNumber(),
    textIndex: 0,
    textFastIndex: 0,
    paragraphIndex: 0,
    customIndex: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        number: randomNumber(),
        textIndex: this.state.textIndex + 1,
        paragraphIndex: this.state.paragraphIndex + 1,
      });
    }, 5000);
    setInterval(() => {
      this.setState({
        textFastIndex: this.state.textFastIndex + 1,
      });
    }, 150);
  }

  render() {
    return (
      <React.Fragment>
        <span className="font-bold xs:text-[45px] ss:text-[55px] xl:text-[80px] bg-gradient-to-r from-blue-100 to-violet-100 text-violet-600 text-[52px] ss:leading-[100px] leading-[75px] rounded-lg p-3">
          <ReactTextTransition
            springConfig={presets.gentle}
            direction="up"
            className="big"
            delay={50}
            inline
          >
            {texts[this.state.textIndex % texts.length]}
          </ReactTextTransition>
        </span>
      </React.Fragment>
    );
  }
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-20 py-5 bg-slate-100">
      <div
        className={`flex flex-col text-[50px] ${inter.className} text-black font-light py-10 bg-gradient-to-r from-blue-100 to-violet-100 rounded-[100px] border-2 border-gray-200 min-h-[500px] min-w-[900px] flex items-center justify-center drop-shadow-lg overflow-hidden
      `}
      >
        <MainBoardText />
        <div className="grid reltive group font-bold">
          <div className="relative justify-self-end bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent text-[25px]">
            Stop waiting best talent to knock at your door!
          </div>
          <div className="relative justify-self-end -top-3 bg-gradient-to-r from-blue-500 to-violet-400 bg-clip-text text-transparent drop-shadow-xl text-[25px]">
            Don&apos;t wait for your dream job post!
          </div>

          <div className="flex flex-col justify-self-end py-4 text-blue-100">
            <Link
              href="/viewTalent/talentTable"
              className="mt-5 text-[20px] bg-gradient-to-r from-violet-400 to-cyan-500 rounded-full p-3 py-2 drop-shadow-md text-center"
            >
              View Talents
            </Link>
          </div>
        </div>
      </div>
      <JobDemand />
    </main>
  );
}

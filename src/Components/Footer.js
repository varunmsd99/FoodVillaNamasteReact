import React from "react";
import { faLinkedin, faGithub, faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="flex flex-col w-full text-white items-center justify-center py-5 bg-[#02060c]">
        <p className="mt-3 justify-between">❤️ Made with Love for Food by Varun 💛</p>
        <div className="my-3 flex items-center justify-center">
          <a
            className="ml-3 text-4xl transition-all hover:text-linkedIn"
            href="https://www.linkedin.com/in/varunpelluru"
            target="_blank"
            title="Varun Pelluru's Linkedin Profile"
          >
            <FontAwesomeIcon icon={faLinkedin}/>
          </a>
          <a
            className="ml-3 text-4xl transition-all hover:text-github"
            href="https://github.com/varunmsd99"
            target="_blank"
            title="Varun Pelluru's GitHub repo"
          >
            <FontAwesomeIcon icon={faGithub}/>
          </a>
          <a
            className="ml-3 text-3xl transition-all hover:text-twitter"
            href="https://twitter.com/varun_vsgvk"
            target="_blank"
            title="Varun Pelluru's Twitter Profile"
          >
            <FontAwesomeIcon icon={faXTwitter}/>
          </a>
          <a
            className="ml-3 text-3xl transition-all hover:text-discord"
            href="https://discordapp.com/users/535798915518169094"
            target="_blank"
            title="Varun Pelluru's Discord Profile"
          >
            <FontAwesomeIcon icon={faDiscord}/>
          </a>
        </div>
        <p className="pb-10" title="Just Kiddin' There is no Copyright for this">©️ 2023 FoodVilla</p>
    </div>
  );
};

export default Footer;

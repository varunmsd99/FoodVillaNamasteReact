const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p className="info">❤️ Created By Varun Pelluru 💛</p>
        <div className="contact-links">
          <a
            className="linkedin"
            href="https://linkedin.com/in/varunpelluru"
            target="_blank"
            title="Varun Pelluru's Linkedin Profile"
          >
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a
            className="github"
            href="https://github.com/varunmsd99"
            target="_blank"
            title="Varun Pelluru's GitHub repo"
          >
            <i class="fa-brands fa-github"></i>
          </a>
          <a
            className="twitter"
            href="https://twitter.com/varun_vsgvk"
            target="_blank"
            title="Varun Pelluru's Twitter Profile"
          >
            <i class="fa-brands fa-square-twitter"></i>
          </a>
          <a
            className="discord"
            href="https://discordapp.com/users/535798915518169094"
            target="_blank"
            title="Varun Pelluru's Discord Profile"
          >
            <i class="fa-brands fa-discord"></i>
          </a>
        </div>
        <p className="copyright-info" title="Just Kiddin' There is no Copyright for this">©️ 2023 FoodVilla</p>
      </div>
    </div>
  );
};

export default Footer;

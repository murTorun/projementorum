const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-center md:text-left">
                Projementorum
              </h3>
              <p>© 2024 Tüm hakları saklıdır.</p>
            </div>
            <div className="flex sm:space-x-4 flex-col  sm:flex-row">
              <a href="#" className="btn btn-ghost">
                LinkedIn
              </a>
              <a href="#" className="btn btn-ghost">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

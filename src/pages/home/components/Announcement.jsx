const Announcement = () => {
  return (
    <section id="announcements" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-section">
          <h2 className="text-3xl sm:text-4xl font-bold text-royal-blue">
            Announcements
          </h2>
          <p className="text-gray-600 mt-2">Get involved and have your say!</p>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 fade-in-section">
            <img
              src="https://i.postimg.cc/Pr2rt8Nx/survery.jpg"
              alt="Survey Announcement"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Survey 1 Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <h3 className="font-bold text-xl text-royal-blue mb-4">
                Youth Voice in Operation 2000 by 2030
              </h3>
              <p className="text-gray-600 mb-6">
                The Ghana Baptist Convention has embarked on an ambitious
                journey to increase our churches to 2,000. Your voice is
                critical to this vision. Please take a few moments to complete
                this survey.
              </p>
              <a
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAN__m1FE-ZURE5aMlRWNTFMTDlKV0pCN042UkNaVVY2SC4u"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Take the Survey
              </a>
            </div>
            {/* Survey 2 Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 fade-in-section">
              <h3 className="font-bold text-xl text-royal-blue mb-4">
                Register for the National Congress!
              </h3>
              <p className="text-gray-600 mb-6">
                Registration for the Ghana Baptist Youth National
                Congress/Conference is now open! Secure your spot for this
                powerful time of worship, learning, fellowship, and fun.
              </p>
              <a
                href="https://forms.office.com/r/g65bWDhTdv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcement;

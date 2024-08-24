import Board from "./Board";

const MainContent = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-16">
        <div className="hero">
          <div className="hero-content text-center text-white p-0">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-5xl font-bold mb-8">
                Projementorum ile Proje Yolculuğunuzda Yalnız Değilsiniz!
              </h1>
              <p className="text-xl mb-8">
                Projementorum, mentor ve ekip arkadaşı bulma sürecinde size
                rehberlik edecek yenilikçi bir platformdur.
              </p>
              <button className="btn btn-primary btn-lg">Hemen Başla</button>
            </div>
          </div>
        </div>
        <Board />
        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Neden Projementorum?
          </h2>
          <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Mentor Desteği
                </h2>
                <p>
                  24/7 ulaşılabilir mentorlar ile projelerinizde yalnız
                  kalmayın.
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Güvenilir Bilgi
                </h2>
                <p>Doğru ve güvenilir bilgilere kolayca ulaşın.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Ekip Arkadaşı Bulma
                </h2>
                <p>Projenize uygun ekip arkadaşlarını keşfedin.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  Online Seminerler
                </h2>
                <p>Adım adım proje geliştirme sürecini açıklayan seminerler.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Nasıl Çalışır?
          </h2>
          <div className="flex flex-col md:flex-row justify-around space-y-8 md:space-y-0">
            <div className="text-center flex-1 h-full">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Projementorum&#39;a kolayca kayıt olun.
              </h3>
            </div>
            <div className="text-center flex-1">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Ekip arkadaşlarını veya mentorları dilediğiniz kriterlere göre
                filtreleyin.
              </h3>
            </div>
            <div className="text-center flex-1">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                Projenizin tam potansiyelini gerçekleştirin!
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Proje Geliştirmenin Gücünü Hissedin!
          </h2>
          <p className="text-xl text-white mb-8">
            Projementorum ile mentorluk desteği alın, ekip arkadaşları bulun, ve
            projelerinizi bir üst seviyeye taşıyın.
          </p>
          <button className="btn btn-primary btn-lg">Şimdi Katılın</button>
        </div>
      </main>
    </div>
  );
};

export default MainContent;

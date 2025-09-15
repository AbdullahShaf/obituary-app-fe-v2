import React from "react";
type ModalIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  index: ModalIndex;
}
export const modelData: Record<
  number,
  { body: React.ReactNode; footer: React.ReactNode }
> = {
  1: {
    body: (
      <>
        <div className="w-full  flex flex-col gap-2">
          <div className=" font-medium tab:text-xl text-base ">
            <span className="tab:hidden">
              Kako lahko sodeluješ na spominski?
            </span>

            <span className="hidden tab:flex">
              Kako lahko sodeluješ na žalni / spominski strani?{" "}
            </span>
          </div>
          <div className="text-[#3C3E41] text-sm flex flex-col gap-3">
            <p>
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> Brez
              registracije: Prižgeš svečko
            </p>
            <p>
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> Potrebna
              registracija: vpis v žalno knjigo, izrek sožalij, statistike
              strani tvojih najbližnjih (tj. tistih strani, kjer si sodeloval),
              opomniki za obletnice
            </p>
            <p>
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> Če ima stran
              Skrbnika: lahko dodajaš tudi fotografije, pišeš zgodbe, spomine,
              zahvale, zadnji pozdrav, lastna sožalja. Objavo odobri Skrbnik.
            </p>
            <p className=" tab:flex hidden">
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> Skrbnik: še 10
              dodatnih opcij, ki omogočijo izdelavo prave spominske{" "}
            </p>
            <p className=" tab:hidden">
              <span className="text-[#EB1D1D] "> &gt;&gt;</span> Skrbnik: še 10+
              dodatnih možnosti, ki omogočijo izdelavo prave spominske strani
              najdražjih
            </p>
          </div>
        </div>
      </>
    ),
    footer: (
      <p className="text-sm tab:text-base text-[#0A85C2] underline">
        Kako dobim skrbnika brezplačno? In kako digitalne kartice?
      </p>
    ),
  },
  2: {
    body: (
      <div className="w-full  text-[#3C3E41] flex flex-col tab:gap-2 gap-3 ">
        <div className=" font-medium tab:text-xl text-base ">
          Kako postanem Skrbnik brezplačno?{" "}
        </div>
        <div className="text-[#3C3E41] tab:text-base text-sm flex flex-col  gap-4 tab:gap-2">
          <p className=" hidden tab:flex">
            Obišči lokalno cvetličarno, ki je že vključena v naš sistem in
            Skrbnika ti bodo aktivirali takoj (za to potrebuješ Mrliški list).
          </p>
          <p className=" tab:hidden ">
            Obišči lokalno cvetličarno, ki je že vključena v naš sistem in
            Skrbnika ti bodo aktivirali takoj (za to potrebuješ Mrliški list).
            Skrbnika nudijo tudi nekatera pogrebna podjetja.
          </p>
          <p className=" hidden tab:flex">
            Tudi digitalne kartice ti lahko izdelajo takoj in jih pošljejo na
            tvoj uporabniški račun.
          </p>
          <p className=" tab:hidden ">
            Tudi digitalne kartice ti lahko cvetličarne izdelajo takoj in jih
            pošljejo na tvoj uporabniški račun.
          </p>
          <p>Mi teh produktov na naši strani ne nudimo.</p>

          <div className="text-[#0A85C2] underline text-sm tab:hidden mt-8 text-right">
            Več o Skrbniku in kaj omogoča je tukaj{" "}
          </div>
        </div>
      </div>
    ),
    footer: (
      <p className="text-sm tab:text-base mt-5 tab:mt-0  text-[#0A85C2] underline">
        <span className="hidden tab:flex">
          Več o Skrbniku in kaj omogoča je tukaj{" "}
        </span>
      </p>
    ),
  },

  3: {
    body: (
      <div className="w-full  flex flex-col gap-2">
        <div className=" font-medium text-base tab:text-xl text-[#0A85C2]">
          Že čez 2 minuti...{" "}
        </div>
        <div className="text-[#3C3E41] text-sm tab:text-base w-[287px] tab:w-full flex flex-col gap-1 tab:gap-2">
          <p className="tab:w-[450px]">
            ...imaš lahko svojo cvetličarno oglaševano na seznamu lokalnih
            cvetličarn in lokalnih osmrtnicah. Brezplačno in brez obveznosti.
          </p>
          <p className="mt-2 tab:mt-0">
            Klikni &gt;&gt;&gt;{" "}
            <span className="text-[#0A85C2]">DODAJ TRGOVINO</span>
          </p>
          <p className="text-[#A6ABBD] text-[11px] tab:text-sm tab:text-right">
            (brez skrbi; lahko poskusiš testno in trgovino takoj nato izbrišeš)
          </p>
          <p className="mt-4 hidden tab:flex ">
            Z dodano trgovino se odprejo nadaljnje možnosti...
          </p>
          <p className="mt-4 tab:hidden ">
            Dodana trgovina odpre nadaljnje možnosti...{" "}
          </p>
        </div>
      </div>
    ),
    footer: (
      <>
        <span className="text-lg">1 / 2</span>
        <p className="text-sm tab:text-base  text-[#0A85C2] underline">
          Odpri naprej{" "}
        </p>
      </>
    ),
  },

  4: {
    body: (
      <div className="w-full  h-full flex flex-col gap-2">
        <div className=" font-medium text-base tab:text-xl text-[#0A85C2]">
          Že v naslednjih nekaj urah ti bo omogočeno...{" "}
        </div>
        <div className="text-[#3C3E41] text-sm tab:text-base gap-5 tab:gap-0 h-full flex flex-col justify-between">
          <div className="text-[#3C3E41] text-sm tab:text-base flex flex-col tab:gap-3">
            <p>. dodajanje osmrtnic</p>
            <p>. pošiljanje Skrbnikov in digitalnih kartic</p>
            <p>. in konec tedna omogočena izdelava lastne spletne strani</p>
          </div>
          <p className="">
            Brez rizika. Brezplačno in brez obveznosti do konca oktobra.{" "}
          </p>
        </div>
      </div>
    ),
    footer: (
      <>
        <span className="text-lg">2 / 2</span>
        <p className="text-sm tab:text-base  text-[#0A85C2] tab:uppercase capitalize">
          Dodaj trgovino{" "}
        </p>
      </>
    ),
  },
  5: {
    body: (
      <div className="w-full  h-full flex flex-col gap-2">
        <div className=" font-medium tab:text-xl text-base text-[#0A85C2]">
          <p className="tab:hidden">Kako naročiti? </p>
          <p className="tab:flex hidden">
            Kako naročiti in izkoristiti priložnost za prve{" "}
          </p>
        </div>

        <div className="text-[#3C3E41] h-full justify-between text-base flex flex-col  gap-3">
          <div className="flex flex-col gap-2 tab:gap-3 tab:w-[462px]">
            <p>
              Trenutno še ne omogočamo spletnega plačevanja (predvideno sredi
              oktobra)
            </p>
            <p>
              Do takrat lahko prve cvetličarne poravnajo naročnino po izdanem
              računu na transakcijski račun.
            </p>
          </div>
          <div className="text-[#0A85C2]  text-base mt-8  ">
            PRILOŽNOST ZA PRVE{" "}
          </div>
        </div>
      </div>
    ),
    footer: (
      <p className="text-sm tab:text-base w-full text-right text-[#0A85C2] ">
        Kaj naročnina pravzaprav vključuje{" "}
      </p>
    ),
  },
  6: {
    body: (
      <div className="w-full  h-full flex flex-col gap-2">
        <div
          className=" font-medium tab:text-xl text-base
  text-[#0A85C2]"
        >
          Kaj naročnina omogoča{" "}
        </div>

        <div className="text-[#3C3E41] h-full tab:w-[460px] tab:text-base text-sm flex flex-col justify-between tab:gap-3 gap-6">
          <div className="flex flex-col gap-2 tab:gap-2">
            <p>
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> prisotnost /
              oglaševanje na seznamu lokalnih cvetličarn
            </p>{" "}
            <p>
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> oglaševanje na
              vseh osmrtnicah v lokalnem kraju
            </p>{" "}
            <p>
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> lastno
              predstavitveno spletno stran
            </p>{" "}
            <p>
              <span className="text-[#EB1D1D]"> &gt;&gt;</span> brezplačna
              darila za svojce:digitalne kartice in status Skrbnika
            </p>
            <p className="text-xs tab:pl-4 text-gray-500">
              (zaradi katerih bodo cvetličarne privabile nove kliente, ki jih
              sicer ne bi bilo)
            </p>
          </div>
          <div className="  tab:text-base text-sm mt-7 tab:mt-0 ">
            Strošek mesečne naročnine od 10€ naprej.{" "}
          </div>
        </div>
      </div>
    ),
    footer: (
      <>
        <p className="text-xs hidden tab:flex tab:text-[13px] tab:px-6">
          Povedano drugače: že s samo enim dodatnim klientom mesečno, je
          naročnina pokrita; če koristi oglaševanja povsem odmislimo.
        </p>
        <p className="text-xs tab:hidden tab:text-[13px] tab:px-6">
          Oz že z enim dodatnim klientom mesečno, je naročnina pokrita; če
          koristi oglaševanja povsem odmislimo.{" "}
        </p>
      </>
    ),
  },
  7: {
    body: (
      <div className="w-full h-full flex flex-col gap-2">
        <div className=" font-medium tab:text-xl text-base text-[#0A85C2]">
          Že čez 2 minuti...{" "}
        </div>
        <div className="text-[#3C3E41] text-sm h-full tab:text-base flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-2">
            <p>
              ...imate lahko svoje podjetje dodano na seznam pogrebnih podjetij
              in še danes boste imeli omogočeno dodajanje osmrtnic (in če to
              želite, tudi pošiljanje Skrbnika najbližjim).
            </p>
            <p className="tab:w-[450px]">
              Do konca tega tedna bomo omogočili tudi izdelavo lastne strani,
              prihodnji teden pa bomo dodali še nek zelo zanimiv produkt.{" "}
            </p>
          </div>
          <p className="mt-5 ">Brezplačno in brez obveznosti. Za vedno. </p>
        </div>
      </div>
    ),
    footer: (
      <p className="text-sm tab:text-base w-full text-right text-[#0A85C2] ">
        Če imate tudi lastno cvetličarno...{" "}
      </p>
    ),
  },
  8: {
    body: (
      <div className="w-full  h-full flex flex-col gap-2">
        <div className=" font-medium text-base tab:text-xl text-[#0A85C2]">
          Če imate lastno cvetličarno{" "}
        </div>

        <div className="text-[#3C3E41] h-full text-sm tab:text-base flex flex-col justify-between gap-3">
          <p className="hidden tab:flex">
            Si boste registrirali le-to posebej (potreben je ločen uporabniški
            račun, ker gre za različne privilegije in ugodnosti). Preglejte
            ugodnosti za cvetličarne - splača se biti med prvimi.
          </p>
          <p className="tab:hidden">
            Si boste registrirali le-to posebej (potreben je ločen uporabniški
            račun, ker gre za različne privilegije in ugodnosti).{" "}
          </p>
          <p className="tab:hidden">
            {" "}
            Preglejte ugodnosti za cvetličarne - splača se biti med prvimi.
          </p>
          <p className="text-[#0A85C2]  text-base tab:mt-14 mt-20 text-right">
            več informacij{" "}
          </p>
        </div>
      </div>
    ),
    footer: <p className="my-3 "></p>,
  },
};

const Modal: React.FC<ModalProps> = ({ open, onClose, index, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 ">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Information"
        className="bg-[#E8F0F6] text-black flex flex-col gap-5 rounded-xl shadow-lg tab:max-w-[700px] max-w-[344px] w-full relative"
      >
        {/* Header */}
        <div className=" absolute  flex items-center flex-row-reverse tab:flex-row justify-between w-full">
          <button
            className="text-[#EB1D1D] hidden tab:flex text-xl ml-4 mt-2"
            title="Help"
          >
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_8894_2304)">
                <path
                  d="M27.5 3.91667C38.2983 3.91667 47.0833 12.7018 47.0833 23.5C47.0833 34.2983 38.2983 43.0833 27.5 43.0833C16.7018 43.0833 7.91667 34.2983 7.91667 23.5C7.91667 12.7018 16.7018 3.91667 27.5 3.91667ZM27.5 0C14.5221 0 4 10.5221 4 23.5C4 36.4779 14.5221 47 27.5 47C40.4779 47 51 36.4779 51 23.5C51 10.5221 40.4779 0 27.5 0ZM29.9479 33.2917C29.9479 34.6429 28.8532 35.7396 27.5 35.7396C26.1507 35.7396 25.0521 34.6429 25.0521 33.2917C25.0521 31.9404 26.1507 30.8438 27.5 30.8438C28.8532 30.8438 29.9479 31.9404 29.9479 33.2917ZM32.6759 13.7122C31.4852 12.5059 29.709 11.842 27.6802 11.842C23.411 11.842 20.6497 14.8775 20.6497 19.5775H24.588C24.588 16.6674 26.2114 15.6353 27.5999 15.6353C28.8415 15.6353 30.1594 16.4598 30.271 18.0363C30.3925 19.695 29.5073 20.537 28.3871 21.6024C25.622 24.2324 25.571 25.5053 25.5828 28.3939H29.5093C29.4838 27.0935 29.568 26.038 31.3403 24.1286C32.6661 22.699 34.315 20.9209 34.3483 18.2105C34.3698 16.401 33.7921 14.8442 32.6759 13.7122Z"
                  fill="#EB1D1D"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_8894_2304"
                  x="0"
                  y="0"
                  width="55"
                  height="55"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_8894_2304"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_8894_2304"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
          <button
            className="text-[#6D778E] hover:text-gray-600 text-2xl"
            onClick={onClose}
            title="Close"
          >
            <svg
              width="79"
              height="79"
              className="w-[55px] tab:w-[79px] h-[55px] tab:h-[79px] "
              viewBox="0 0 79 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_8894_2303)">
                <path
                  d="M36.3 39.6016L29.7004 33.0019L33.0002 29.7021L39.5999 36.3017L46.1995 29.7021L49.4994 33.0019L42.8997 39.6016L49.4994 46.2012L46.1995 49.5011L39.5999 42.9014L33.0002 49.5011L29.7004 46.2012L36.3 39.6016ZM56.099 56.1007C46.9868 65.213 32.2129 65.2129 23.1007 56.1007C13.9885 46.9885 13.9885 32.2146 23.1007 23.1024C32.2129 13.9903 46.9868 13.9902 56.099 23.1024C65.2112 32.2146 65.2112 46.9886 56.099 56.1007ZM52.7992 52.8009C60.089 45.5111 60.089 33.6921 52.7992 26.4022C45.5094 19.1124 33.6904 19.1124 26.4006 26.4022C19.1108 33.692 19.1108 45.5111 26.4006 52.8009C33.6904 60.0907 45.5094 60.0907 52.7992 52.8009Z"
                  fill="#6D778E"
                  stroke="#C9D2E7"
                  strokeWidth="0.4"
                />
              </g>
              <defs>
                <clipPath id="clip0_8894_2303">
                  <rect
                    width="56"
                    height="56"
                    fill="white"
                    transform="translate(0 39.6016) rotate(-45)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        {/* Content */}
        <div
          className={` tab:mx-[90px] mx-4 tab:mt-16 mt-[61px] tab:px-[34px] px-5  bg-white ${
            [3, 4].includes(index) ? "  h-[242px]" : "  h-[360px]"
          } tab:h-[271px]  text-[#3C3E41] shadow-md tab:py-[34px] py-[22px] border-2 border-[#0A85C2]`}
        >
          {modelData[index]?.body}
        </div>
        {/* Footer / Navigation */}

        <div className="  tab:mx-[90px] mx-4 tab:mb-[45px] mb-5  flex items-center justify-between  text-gray-500">
          {modelData[index]?.footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;

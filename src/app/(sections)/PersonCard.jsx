import Link from "next/link";
import Image from "next/image";

const getUniqueColors = () => {
  const colors = [
    "bg-blue-200 text-blue-700",
    "bg-green-200 text-green-700",
    "bg-purple-200 text-purple-700",
    "bg-red-200 text-red-700",
    "bg-yellow-200 text-yellow-700",
  ];

  // Shuffle the array to randomize the order of colors
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }

  return colors;
};

const PersonCard = ({
  name,
  title,
  description,
  tags,
  linkedin,
  email,
  src,
  isForm,
}) => {
  const colors = getUniqueColors();
  return (
    <div
      className={`max-w-sm   h-fit mx-auto bg-white ${
        isForm
          ? "shadow-2xl shadow-blue-800 mb-16 sm:mb-24 border-blue-800 border"
          : ""
      } rounded-lg overflow-hidden `}
    >
      <div className="flex flex-col sm:flex-row items-center px-4 py-2 sm:px-6 sm:py-4">
        {src ? (
          <Image
            src={src}
            alt="Profile Picture"
            width={60}
            height={60}
            className="rounded-full mt-3 sm:mt-0"
          />
        ) : (
          <svg
            className="w-16 h-16 text-gray-300 rounded-full mt-3 sm:mt-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 24H0v-1.5a6.5 6.5 0 016.5-6.5h11a6.5 6.5 0 016.5 6.5V24zM12 13.5a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        )}
        <div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>

      <div className="px-4 py-2 sm:px-6 sm:py-4">
        <p className="text-gray-700 text-base">{description}</p>
        <div className="mt-4">
          {tags &&
            tags.map((tag, index) => (
              <span
                key={index}
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mt-2 ${
                  colors[index % colors.length]
                }`}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
      <div className="px-4 pt-2 pb-4 sm:px-6 sm:pt-4 sm:pb-6 flex flex-col sm:gap-4 xl:flex-row xl:gap-2 items-center justify-between">
        <div className="flex gap-2">
          {linkedin && (
            <Link
              href={linkedin}
              target="_blank"
              className="text-blue-500 hover:text-blue-700 transition ease-in-out duration-300"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.23 0H1.77C.79 0 0 .8 0 1.78v20.44C0 23.2.79 24 1.77 24h20.46c.98 0 1.77-.8 1.77-1.78V1.78C24 .8 23.21 0 22.23 0zm-14.1 20.45H4.55V9.14h3.57v11.31zM6.34 7.58a2.06 2.06 0 01-2.07-2.05c0-1.13.93-2.05 2.07-2.05 1.14 0 2.07.92 2.07 2.05 0 1.13-.93 2.05-2.07 2.05zm14.1 12.87h-3.57V14.5c0-1.42-.03-3.23-1.97-3.23-1.97 0-2.28 1.54-2.28 3.12v6.06h-3.57V9.14h3.43v1.54h.05c.48-.91 1.64-1.86 3.37-1.86 3.61 0 4.28 2.37 4.28 5.45v6.18z" />
              </svg>
            </Link>
          )}
        </div>

        <Link
          href={`mailto:${email}`}
          className="mt-4 sm:mt-0 btn btn-sm btn-outline justify-self-end "
        >
          {email}
        </Link>
      </div>
    </div>
  );
};

export default PersonCard;

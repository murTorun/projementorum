import PersonCard from "./PersonCard";

const PersonCardDisplay = () => {
  /* If filters are empty and there are no results, display this message. */
  if (false) {
    return (
      <div className="p-4 bg-base-200 rounded-lg">
        <p className="text-center text-gray-500">Sonuç bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-base-200 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
      <PersonCard />
      <PersonCard />
      <PersonCard />
      <PersonCard />
    </div>
  );
};

export default PersonCardDisplay;

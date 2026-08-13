function ObjectSelector({
  selectedObject,
  setSelectedObject
}) {

  const objects = [
    "Account",
    "Contact",
    "Lead",
    "Opportunity",
    "Case"
  ];

  return (
    <select
      value={selectedObject}
      onChange={(e) =>
        setSelectedObject(e.target.value)
      }
    >
      {objects.map((object) => (
        <option
          key={object}
          value={object}
        >
          {object}
        </option>
      ))}
    </select>
  );
}

export default ObjectSelector;

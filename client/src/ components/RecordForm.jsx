import { useEffect, useState } from "react";

function RecordForm({
  objectName,
  fields,
  record = null,
  onSubmit,
  onCancel
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialData = {};

    fields
      .filter(
        (field) =>
          field !== "Id" &&
          field !== "attributes"
      )
      .forEach((field) => {
        initialData[field] =
          record?.[field] ?? "";
      });

    setFormData(initialData);
  }, [fields, record]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  const getInputType = (field) => {
    const lowerField = field.toLowerCase();

    if (lowerField.includes("email")) {
      return "email";
    }

    if (lowerField.includes("date")) {
      return "date";
    }

    if (lowerField.includes("amount")) {
      return "number";
    }

    return "text";
  };

  const isRequired = (field) => {
    return [
      "Name",
      "LastName",
      "Company",
      "Subject",
      "StageName",
      "CloseDate"
    ].includes(field);
  };

  return (
    <form
      className="record-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {record
          ? `Edit ${objectName}`
          : `Create ${objectName}`}
      </h2>

      {fields
        .filter(
          (field) =>
            field !== "Id" &&
            field !== "attributes"
        )
        .map((field) => (
          <div
            className="form-group"
            key={field}
          >
            <label htmlFor={field}>
              {field}
              {isRequired(field) && (
                <span> *</span>
              )}
            </label>

            <input
              id={field}
              name={field}
              type={getInputType(field)}
              value={formData[field] ?? ""}
              onChange={handleChange}
              required={isRequired(field)}
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button type="submit">
          {record ? "Update Record" : "Create Record"}
        </button>
      </div>
    </form>
  );
}

export default RecordForm;

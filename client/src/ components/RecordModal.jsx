import { useEffect, useState } from "react";

function RecordModal({
  isOpen,
  mode,
  objectName,
  record,
  fields,
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (record) {
      setFormData({ ...record });
    } else {
      const emptyData = {};

      fields.forEach((field) => {
        if (field !== "Id") {
          emptyData[field] = "";
        }
      });

      setFormData(emptyData);
    }
  }, [record, fields, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { ...formData };

    delete data.Id;
    delete data.attributes;

    await onSave(data);
  };

  const getInputType = (field) => {
    if (
      field.toLowerCase().includes("email")
    ) {
      return "email";
    }

    if (
      field.toLowerCase().includes("amount") ||
      field.toLowerCase().includes("phone")
    ) {
      return "text";
    }

    if (
      field.toLowerCase().includes("date")
    ) {
      return "date";
    }

    return "text";
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>
            {mode === "view"
              ? `${objectName} Details`
              : mode === "edit"
              ? `Edit ${objectName}`
              : `Create ${objectName}`}
          </h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {mode === "view" ? (
          <div className="record-details">

            {fields
              .filter(
                (field) =>
                  field !== "attributes"
              )
              .map((field) => (
                <div
                  className="detail-row"
                  key={field}
                >
                  <strong>{field}</strong>

                  <span>
                    {record?.[field] || "-"}
                  </span>
                </div>
              ))}

            <button
              type="button"
              onClick={onClose}
            >
              Close
            </button>

          </div>
        ) : (
          <form onSubmit={handleSubmit}>

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
                  </label>

                  <input
                    id={field}
                    type={getInputType(field)}
                    value={
                      formData[field] ?? ""
                    }
                    onChange={(event) =>
                      handleChange(
                        field,
                        event.target.value
                      )
                    }
                    required={
                      field === "Name" ||
                      field === "LastName" ||
                      field === "Company" ||
                      field === "Subject"
                    }
                  />
                </div>
              ))}

            <div className="modal-actions">

              <button
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
              >
                {mode === "edit"
                  ? "Update"
                  : "Create"}
              </button>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default RecordModal;

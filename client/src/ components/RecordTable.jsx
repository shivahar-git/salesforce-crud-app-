function RecordTable({
  records,
  onEdit,
  onDelete,
  onView
}) {

  if (!records.length) {
    return <p>No records found.</p>;
  }

  const fields = Object.keys(records[0])
    .filter((key) =>
      key !== "attributes"
    );

  return (
    <table border="1">
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={field}>
              {field}
            </th>
          ))}

          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {records.map((record) => (
          <tr key={record.Id}>
            {fields.map((field) => (
              <td key={field}>
                {record[field]}
              </td>
            ))}

            <td>
              <button
                onClick={() =>
                  onView(record)
                }
              >
                View
              </button>

              <button
                onClick={() =>
                  onEdit(record)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  onDelete(record.Id)
                }
              >
                Delete
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RecordTable;

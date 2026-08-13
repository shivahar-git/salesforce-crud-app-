const objectConfig = {
  Account: {
    fields: [
      "Id",
      "Name",
      "Phone",
      "Website",
      "Industry",
      "Type"
    ],
    createFields: [
      "Name",
      "Phone",
      "Website",
      "Industry",
      "Type"
    ]
  },

  Contact: {
    fields: [
      "Id",
      "FirstName",
      "LastName",
      "Email",
      "Phone",
      "Title"
    ],
    createFields: [
      "FirstName",
      "LastName",
      "Email",
      "Phone",
      "Title"
    ]
  },

  Lead: {
    fields: [
      "Id",
      "FirstName",
      "LastName",
      "Company",
      "Email",
      "Phone",
      "Status"
    ],
    createFields: [
      "FirstName",
      "LastName",
      "Company",
      "Email",
      "Phone",
      "Status"
    ]
  },

  Opportunity: {
    fields: [
      "Id",
      "Name",
      "StageName",
      "CloseDate",
      "Amount",
      "Type"
    ],
    createFields: [
      "Name",
      "StageName",
      "CloseDate",
      "Amount",
      "Type"
    ]
  },

  Case: {
    fields: [
      "Id",
      "CaseNumber",
      "Subject",
      "Status",
      "Priority",
      "Origin"
    ],
    createFields: [
      "Subject",
      "Status",
      "Priority",
      "Origin"
    ]
  }
};

module.exports = objectConfig;

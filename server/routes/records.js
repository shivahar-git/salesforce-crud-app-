const express = require("express");
const axios = require("axios");

const objectConfig = require("../utils/objectConfig");

const router = express.Router();

let authModule;

router.use((req, res, next) => {
  authModule = require("./auth");
  next();
});

router.get("/:objectName", async (req, res) => {
  try {
    const { objectName } = req.params;
    const offset = Number(req.query.offset || 0);

    if (!objectConfig[objectName]) {
      return res.status(400).json({
        message: "Invalid Salesforce object"
      });
    }

    const { accessToken, instanceUrl } =
      authModule.getSalesforceAuth();

    if (!accessToken) {
      return res.status(401).json({
        message: "Not authenticated"
      });
    }

    const fields =
      objectConfig[objectName].fields.join(",");

    const query = `
      SELECT ${fields}
      FROM ${objectName}
      ORDER BY CreatedDate DESC
      LIMIT 20
      OFFSET ${offset}
    `;

    const response = await axios.get(
      `${instanceUrl}/services/data/v60.0/query`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          q: query
        }
      }
    );

    res.json({
      records: response.data.records,
      done: response.data.done
    });

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Failed to fetch records"
    });
  }
});


router.post("/:objectName", async (req, res) => {
  try {
    const { objectName } = req.params;

    const { accessToken, instanceUrl } =
      authModule.getSalesforceAuth();

    const response = await axios.post(
      `${instanceUrl}/services/data/v60.0/sobjects/${objectName}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json(
      error.response?.data || {
        message: "Failed to create record"
      }
    );
  }
});

router.patch("/:objectName/:id", async (req, res) => {
  try {
    const { objectName, id } = req.params;

    const { accessToken, instanceUrl } =
      authModule.getSalesforceAuth();

    await axios.patch(
      `${instanceUrl}/services/data/v60.0/sobjects/${objectName}/${id}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true
    });

  } catch (error) {
    res.status(500).json(
      error.response?.data || {
        message: "Failed to update record"
      }
    );
  }
});
router.delete("/:objectName/:id", async (req, res) => {
  try {
    const { objectName, id } = req.params;

    const { accessToken, instanceUrl } =
      authModule.getSalesforceAuth();

    await axios.delete(
      `${instanceUrl}/services/data/v60.0/sobjects/${objectName}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    res.json({
      success: true
    });

  } catch (error) {
    res.status(500).json(
      error.response?.data || {
        message: "Failed to delete record"
      }
    );
  }
});

module.exports = router;

import {
  useState,
  useEffect,
  useRef
} from "react";

import ObjectSelector
  from "./components/ObjectSelector";

import RecordTable
  from "./components/RecordTable";

import {
  login,
  getSession,
  getRecords,
  deleteRecord
} from "./services/api";

function App() {

  const [authenticated,
    setAuthenticated] =
    useState(false);

  const [selectedObject,
    setSelectedObject] =
    useState("Account");

  const [records,
    setRecords] =
    useState([]);

  const [offset,
    setOffset] =
    useState(0);

  const [loading,
    setLoading] =
    useState(false);

  const [hasMore,
    setHasMore] =
    useState(true);

  const loaderRef =
    useRef();

  useEffect(() => {

    getSession()
      .then((response) => {
        setAuthenticated(
          response.data.authenticated
        );
      })
      .catch(() => {
        setAuthenticated(false);
      });

  }, []);

  useEffect(() => {

    setRecords([]);
    setOffset(0);
    setHasMore(true);

    if (authenticated) {
      loadRecords(0, true);
    }

  }, [
    selectedObject,
    authenticated
  ]);

  const loadRecords =
    async (
      currentOffset,
      reset = false
    ) => {

      if (loading || !hasMore) {
        return;
      }

      setLoading(true);

      try {

        const response =
          await getRecords(
            selectedObject,
            currentOffset
          );

        const newRecords =
          response.data.records;

        setRecords((previous) =>
          reset
            ? newRecords
            : [
                ...previous,
                ...newRecords
              ]
        );

        setOffset(
          currentOffset +
          newRecords.length
        );

        if (
          newRecords.length < 20
        ) {
          setHasMore(false);
        }

      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

  useEffect(() => {

    const observer =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0].isIntersecting &&
            hasMore &&
            !loading &&
            authenticated
          ) {

            loadRecords(offset);

          }

        },
        {
          threshold: 1
        }
      );

    if (loaderRef.current) {
      observer.observe(
        loaderRef.current
      );
    }

    return () =>
      observer.disconnect();

  }, [
    offset,
    hasMore,
    loading,
    authenticated
  ]);

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this record?"
        );

      if (!confirmed) {
        return;
      }

      await deleteRecord(
        selectedObject,
        id
      );

      setRecords((previous) =>
        previous.filter(
          (record) =>
            record.Id !== id
        )
      );
    };

  if (!authenticated) {
    return (
      <div>
        <h1>
          Salesforce CRUD Application
        </h1>

        <button
          onClick={login}
        >
          Login with Salesforce
        </button>
      </div>
    );
  }

  return (
    <div>

      <h1>
        Salesforce CRUD Dashboard
      </h1>

      <ObjectSelector
        selectedObject={selectedObject}
        setSelectedObject={
          setSelectedObject
        }
      />

      <RecordTable
        records={records}
        onView={(record) =>
          console.log(record)
        }
        onEdit={(record) =>
          console.log(record)
        }
        onDelete={handleDelete}
      />

      {loading && (
        <p>Loading...</p>
      )}

      <div
        ref={loaderRef}
        style={{
          height: "20px"
        }}
      />

      {!hasMore && (
        <p>
          No more records
        </p>
      )}

    </div>
  );
}

export default App;

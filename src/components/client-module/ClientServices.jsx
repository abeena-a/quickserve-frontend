import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchApprovedServices,
} from "../../redux/serviceSlice";

import {
  createRequest,
} from "../../redux/requestSlice";

export default function ClientServices() {
  const dispatch = useDispatch();

  // const services =
  //   useSelector(
  //     (state) => state.services.services
  //   ) || [];

  const {
    services,
    loading,
    error,
  } = useSelector(
    (state) => state.services
  );

  const requests =
    useSelector(
      (state) => state.requests.requests
    ) || [];

  const currentClient =
    useSelector(
      (state) => state.auth.currentUser
    );

  const [showRequestModal,
    setShowRequestModal] =
    useState(false);

  const [selectedService,
    setSelectedService] =
    useState(null);

  const [requestDetails,
    setRequestDetails] =
    useState({
      notes: "",
      date: "",
      time: "",
    });

  /*
   Load approved services
  */
  useEffect(() => {
    dispatch(
      fetchApprovedServices()
    );
  }, [dispatch]);

  const handleOpenModal = (
    service
  ) => {
    setSelectedService(
      service
    );

    setShowRequestModal(
      true
    );
  };

  const handleSubmitRequest =
    async () => {

      if (!selectedService) {
        alert(
          "No service selected!"
        );
        return;
      }

      if (!currentClient) {
        alert(
          "No client logged in!"
        );
        return;
      }

      try {

        await dispatch(
          createRequest({
            serviceId:
              selectedService._id,

            notes:
              requestDetails.notes,

            date:
              requestDetails.date,

            time:
              requestDetails.time,
          })
        ).unwrap();

        setShowRequestModal(false);

        setRequestDetails({
          notes: "",
          date: "",
          time: "",
        });

        setSelectedService(null);

        alert(
          "Service request submitted successfully!"
        );

      } catch (error) {

        alert(
          error.message ||
          "Failed to submit request"
        );

      }

    };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          Loading services...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Available Services
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-100 text-left">
            <th className="p-2">
              Sl No
            </th>

            <th className="p-2">
              Service Name
            </th>

            <th className="p-2">
              Description
            </th>

            <th className="p-2">
              Vendor
            </th>

            <th className="p-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {services.length > 0 ? (

            services.map(
              (
                service,
                index
              ) => {

                const alreadyRequested =
                  requests.some(
                    (
                      request
                    ) =>
                      request.serviceId ===
                      service._id &&
                      request.clientId ===
                      currentClient?._id
                  );

                return (
                  <tr
                    key={
                      service._id
                    }
                    className="border-b"
                  >
                    <td className="p-2">
                      {index + 1}
                    </td>

                    <td className="p-2">
                      {
                        service.title
                      }
                    </td>

                    <td className="p-2">
                      {
                        service.description
                      }
                    </td>

                    <td className="p-2">
                      {
                        service.vendorName
                      }
                    </td>

                    <td className="p-2">
                      {alreadyRequested ? (
                        <button
                          disabled
                          className="bg-gray-400 text-white px-3 py-1 rounded text-sm cursor-not-allowed"
                        >
                          Waiting for
                          acknowledgement
                        </button>
                      ) : (
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() =>
                            handleOpenModal(
                              service
                            )
                          }
                        >
                          Request
                        </button>
                      )}
                    </td>
                  </tr>
                );
              }
            )

          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center p-4 text-gray-500"
              >
               <div className="text-center p-8">
  <p className="text-gray-500">
    No approved services available.
  </p>
</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showRequestModal &&
        selectedService && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

              <div className="flex justify-between items-center mb-4">

                <h3 className="text-xl font-bold">
                  Request{" "}
                  {
                    selectedService.title
                  }
                </h3>

                <button
                  onClick={() => {
                    setShowRequestModal(
                      false
                    );

                    setSelectedService(
                      null
                    );
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>

              </div>

              <div className="space-y-3">

                <textarea
                  placeholder="Enter details / notes"
                  className="w-full border p-2 rounded"
                  value={
                    requestDetails.notes
                  }
                  onChange={(e) =>
                    setRequestDetails({
                      ...requestDetails,
                      notes:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={
                    requestDetails.date
                  }
                  onChange={(e) =>
                    setRequestDetails({
                      ...requestDetails,
                      date:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="time"
                  className="w-full border p-2 rounded"
                  value={
                    requestDetails.time
                  }
                  onChange={(e) =>
                    setRequestDetails({
                      ...requestDetails,
                      time:
                        e.target.value,
                    })
                  }
                />

              </div>

              <div className="flex justify-end space-x-2 mt-4">

                <button
                  onClick={() => {
                    setShowRequestModal(
                      false
                    );

                    setSelectedService(
                      null
                    );
                  }}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleSubmitRequest
                  }
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                  Submit Request
                </button>

              </div>
            </div>
          </div>
        )}
    </div>
  );
}
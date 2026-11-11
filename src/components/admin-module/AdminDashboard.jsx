import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchServices,
} from "../../redux/serviceSlice";

import {
  fetchRequests,
} from "../../redux/requestSlice";

export default function AdminDashboard() {
  const dispatch =
    useDispatch();

  const services =
    useSelector(
      (state) =>
        state.services.services
    ) || [];

  const requests =
    useSelector(
      (state) =>
        state.requests.requests
    ) || [];

  const loadingServices =
    useSelector(
      (state) =>
        state.services.loading
    );

  const loadingRequests =
    useSelector(
      (state) =>
        state.requests.loading
    );

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchRequests());
  }, [dispatch]);

  if (
    loadingServices ||
    loadingRequests
  ) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  const totalServices =
    services.length;

  const totalRequests =
    requests.length;

  const processingRequests =
    requests.filter(
      (request) =>
        request.status ===
        "processing"
    ).length;

  const completedRequests =
    requests.filter(
      (request) =>
        request.status ===
        "completed"
    ).length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-purple-100 p-4 rounded">
          <h3 className="font-semibold">
            Total Services
          </h3>

          <p className="text-2xl font-bold">
            {totalServices}
          </p>
        </div>

        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-semibold">
            Total Requests
          </h3>

          <p className="text-2xl font-bold">
            {totalRequests}
          </p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="font-semibold">
            In Progress
          </h3>

          <p className="text-2xl font-bold">
            {processingRequests}
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">
            Completed
          </h3>

          <p className="text-2xl font-bold">
            {completedRequests}
          </p>
        </div>

      </div>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">
          Recent Requests
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-100 text-left">
              <th className="p-2">
                Client
              </th>

              <th className="p-2">
                Service
              </th>

              <th className="p-2">
                Vendor
              </th>

              <th className="p-2">
                Status
              </th>

              <th className="p-2">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.length > 0 ? (
              requests
                .slice()
                .reverse()
                .slice(0, 10)
                .map(
                  (
                    request
                  ) => (
                    <tr
                      key={
                        request._id
                      }
                      className="border-b"
                    >
                      <td className="p-2">
                        {
                          request.clientName
                        }
                      </td>

                      <td className="p-2">
                        {
                          request.serviceName
                        }
                      </td>

                      <td className="p-2">
                        {
                          request.vendorName
                        }
                      </td>

                      <td className="p-2">
                        {
                          request.status
                        }
                      </td>

                      <td className="p-2">
                        {request.date ||
                          "-"}
                      </td>
                    </tr>
                  )
                )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500"
                >
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
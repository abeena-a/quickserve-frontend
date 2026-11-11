import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchRequests,
} from "../../redux/requestSlice";

export default function AdminRequests() {
  const dispatch = useDispatch();

  const requests =
    useSelector(
      (state) =>
        state.requests.requests
    ) || [];

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Service Requests
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
              Notes
            </th>

            <th className="p-2">
              Date
            </th>

            <th className="p-2">
              Time
            </th>

            <th className="p-2">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {requests.length > 0 ? (
            requests.map(
              (request) => (
                <tr
                  key={request._id}
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
                    {request.notes}
                  </td>

                  <td className="p-2">
                    {request.date}
                  </td>

                  <td className="p-2">
                    {request.time}
                  </td>

                  <td className="p-2">
                    {request.status}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center p-4 text-gray-500"
              >
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
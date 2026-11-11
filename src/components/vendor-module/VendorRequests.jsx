import {
  useState,
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchVendorRequests,
  updateRequestStatusAsync,
} from "../../redux/requestSlice";

import StatusBadge from "../../pages/StatusBadge";
import ChatSidebar from "../../pages/ChatSidebar";

export default function VendorRequests() {
  const dispatch = useDispatch();

  const currentVendor =
    useSelector(
      (state) => state.auth.currentUser
    );

  const requests =
    useSelector(
      (state) => state.requests.requests
    ) || [];

  const [activeChat, setActiveChat] =
    useState(null);

  useEffect(() => {
    dispatch(
      fetchVendorRequests()
    );
  }, [dispatch]);

  if (!currentVendor) {
    return (
      <p className="text-center p-4 text-gray-500">
        Please log in as a vendor
        to view requests.
      </p>
    );
  }

  const vendorRequests = requests;

  const activeRequest =
    vendorRequests.find(
      (request) =>
        request._id === activeChat
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Client Requests
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
            <th className="p-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {vendorRequests.length > 0 ? (
            vendorRequests.map(
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
                    {request.notes}
                  </td>

                  <td className="p-2">
                    {request.date}
                  </td>

                  <td className="p-2">
                    {request.time}
                  </td>

                  <td className="p-2">
                    <StatusBadge
                      status={
                        request.status
                      }
                    />
                  </td>

                  <td className="p-2 flex gap-2">

                    {request.status ===
                      "waiting for acknowledge" && (
                        <>
                          <button
                            className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                            onClick={() =>
                              dispatch(
                                updateRequestStatusAsync(
                                  {
                                    requestId:
                                      request._id,
                                    status:
                                      "processing",
                                  }
                                )
                              )
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                            onClick={() =>
                              dispatch(
                                updateRequestStatusAsync(
                                  {
                                    requestId:
                                      request._id,
                                    status:
                                      "rejected",
                                  }
                                )
                              )
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}

                    {request.status ===
                      "processing" && (
                        <button
                          className="bg-purple-600 text-white px-2 py-1 rounded text-sm"
                          onClick={() =>
                            dispatch(
                              updateRequestStatusAsync(
                                {
                                  requestId:
                                    request._id,
                                  status:
                                    "completed",
                                }
                              )
                            )
                          }
                        >
                          Mark Completed
                        </button>
                      )}

                    {request.status !==
                      "rejected" && (
                        <button
                          className="bg-gray-200 px-2 py-1 rounded text-sm"
                          onClick={() =>
                            setActiveChat(
                              request._id
                            )
                          }
                        >
                          💬 Chat
                        </button>
                      )}

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

      <ChatSidebar
        activeRequest={activeRequest}
        onClose={() =>
          setActiveChat(null)
        }
        currentUser={{
          role: "vendor",
          id: currentVendor._id,
        }}
      />
    </div>
  );
}
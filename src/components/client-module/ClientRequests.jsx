import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
  fetchClientRequests,
  updateRequestStatusAsync,
} from "../../redux/requestSlice";

import StatusBadge from "../../pages/StatusBadge";
import ChatSidebar from "../../pages/ChatSidebar";

export default function ClientRequests() {
  const dispatch = useDispatch();

  const currentClient = useSelector(
    (state) => state.auth.currentUser
  );

  const requests =
    useSelector((state) => state.requests.requests) || [];

  const [activeChat, setActiveChat] =
    useState(null);

  useEffect(() => {
    dispatch(fetchClientRequests());
  }, [dispatch]);

  if (!currentClient) {
    return (
      <p className="text-center p-4 text-gray-500">
        Please log in as a client to view requests.
      </p>
    );
  }

  const clientRequests = requests;

  const activeRequest =
    clientRequests.find(
      (req) => req._id === activeChat
    );


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Service Requests
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-100 text-left">
            <th className="p-2">Service</th>
            <th className="p-2">Vendor</th>
            <th className="p-2">Notes</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {clientRequests.length > 0 ? (
            clientRequests.map((req) => (
              <tr
                key={req._id}
                className="border-b"
              >
                <td className="p-2">
                  {req.serviceName}
                </td>

                <td className="p-2">
                  {req.vendorName}
                </td>

                <td className="p-2">
                  {req.notes}
                </td>

                <td className="p-2">
                  {req.date}
                </td>

                <td className="p-2">
                  {req.time}
                </td>

                <td className="p-2">
                  <StatusBadge
                    status={req.status}
                  />
                </td>

                <td className="p-2 flex space-x-2">
                  {req.status === "completed" && (
                    <button
                      className="bg-gray-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() =>
                        dispatch(
                          updateRequestStatusAsync({
                            requestId: req._id,
                            status: "closed",
                          })
                        )
                      }
                    >
                      Close Request
                    </button>
                  )}

                  <button
                    className="bg-gray-200 px-2 py-1 rounded text-sm"
                    onClick={() =>
                      setActiveChat(req._id)
                    }
                  >
                    💬 Chat
                  </button>
                </td>
              </tr>
            ))
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
        onClose={() => setActiveChat(null)}
        currentUser={{
          role: "client",
          id: currentClient._id,
        }}
      />
    </div>
  );
}
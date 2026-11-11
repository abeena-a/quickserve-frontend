import {
  useState,
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  sendMessage,
  fetchMessages,
} from "../redux/messageSlice";

export default function MessageThread({
  requestId,
  currentUser,
  clientId,
  vendorId,
}) {
  const dispatch = useDispatch();

  const { messages, loading } =
    useSelector(
      (state) => state.messages
    );

  const [newMessage, setNewMessage] =
    useState("");

  // useEffect(() => {
  //   if (requestId) {
  //     dispatch(
  //       fetchMessages(requestId)
  //     );
  //   }
  // }, [dispatch, requestId]);



useEffect(() => {
  console.log(
    "CHAT OPENED FOR REQUEST:",
    requestId
  );

  if (requestId) {
    dispatch(fetchMessages(requestId));
  }
}, [dispatch, requestId]);





  // Access control
  if (
    currentUser.role !== "admin" &&
    !(
      (currentUser.role ===
        "client" &&
        currentUser.id ===
          clientId) ||
      (currentUser.role ===
        "vendor" &&
        currentUser.id ===
          vendorId)
    )
  ) {
    return (
      <p className="text-red-500">
        Access denied: you are not
        part of this request.
      </p>
    );
  }

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      await dispatch(
        sendMessage({
          requestId,
          message: newMessage,
        })
      ).unwrap();

      dispatch(
        fetchMessages(requestId)
      );

      setNewMessage("");
    } catch (error) {
      console.error(error);
      alert(
        "Failed to send message"
      );
    }
  };

  return (
    <div className="border rounded p-3 bg-gray-50">
      <div className="space-y-2 max-h-96 overflow-y-auto mb-3">

        {loading && (
          <p className="text-gray-500 text-sm">
            Loading messages...
          </p>
        )}

        {messages.length === 0 &&
          !loading && (
            <p className="text-gray-500 text-sm">
              No messages yet.
            </p>
          )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              String(msg.senderId) ===
              String(currentUser.id)
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-xs ${
                msg.senderRole ===
                "client"
                  ? "bg-blue-100 text-blue-800"
                  : msg.senderRole ===
                    "vendor"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{msg.message}</p>

              <span className="block text-xs text-gray-500 mt-1">
                {new Date(
                  msg.createdAt
                ).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {currentUser.role !==
        "admin" && (
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) =>
              setNewMessage(
                e.target.value
              )
            }
            placeholder="Type a message..."
            className="flex-1 border rounded p-2 text-sm"
          />

          <button
            onClick={handleSend}
            className="bg-purple-600 text-white px-3 py-1 rounded text-sm"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
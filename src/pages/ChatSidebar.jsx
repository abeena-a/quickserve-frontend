import MessageThread from "./MessageThread";

export default function ChatSidebar({
  activeRequest,
  onClose,
  currentUser,
}) {
  if (!activeRequest) return null;

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg border-l p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">
          Conversation
        </h3>

        <button
          className="text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
      </div>

      <MessageThread
        requestId={activeRequest._id}
        currentUser={currentUser}
        clientId={activeRequest.clientId}
        vendorId={activeRequest.vendorId}
      />
    </div>
  );
}
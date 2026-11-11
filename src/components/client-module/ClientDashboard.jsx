import {
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchApprovedServices,
} from "../../redux/serviceSlice";

import {
  fetchClientRequests,
} from "../../redux/requestSlice";




export default function ClientDashboard() {



  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(
      fetchApprovedServices()
    );

    dispatch(
      fetchClientRequests()
    );

  }, [dispatch]);

  const services =
    useSelector(state => state.services?.services) || [];

  const requests =
    useSelector(state => state.requests?.requests) || [];

  const currentUser =
    useSelector(state => state.auth.currentUser);

  if (!currentUser) return null;

  const clientRequests = requests.filter(
    (req) => req.clientId === currentUser?._id
  );



  console.log("services state", services);
  console.log("requests state", requests);
  console.log("currentUser", currentUser);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-purple-100 p-4 rounded">
          <h3 className="font-semibold">Vendor Services</h3>
          <p>{services.length} available</p>
        </div>
        <div className="bg-purple-100 p-4 rounded">
          <h3 className="font-semibold">My Requests</h3>
          <p>{clientRequests.length} submitted</p>
        </div>
        <div className="bg-purple-100 p-4 rounded">
          <h3 className="font-semibold">Follow‑ups</h3>
          <p>{clientRequests.filter(r => r.status === "processing").length} pending</p>
        </div>
      </div>

      {/* Detailed table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-purple-200 text-left">
            <th className="p-2">Service</th>
            <th className="p-2">Notes</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {clientRequests.map((req, idx) => (
            <tr key={idx} className="border-b">
              <td>{req.serviceName}</td>
              <td>{req.notes}</td>
              <td>{req.date}</td>
              <td>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

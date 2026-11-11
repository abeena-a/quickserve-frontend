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
  fetchVendorRequests,
} from "../../redux/requestSlice";





export default function VendorDashboard() {

const dispatch = useDispatch();

useEffect(() => {

  dispatch(
    fetchApprovedServices()
  );

  dispatch(
    fetchVendorRequests()
  );

}, [dispatch]);



  const currentUser = useSelector(
    (state) => state.auth.currentUser
  );

  const services =
    useSelector((state) => state.services.services) || [];

  const requests =
    useSelector((state) => state.requests.requests) || [];

  const vendorServices = services.filter(
    (service) => service.vendorId === currentUser?._id
  );

  const vendorRequests = requests.filter(
    (request) => request.vendorId === currentUser?._id
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Vendor Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">My Services</h3>
          <p>{vendorServices.length} listed</p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Client Requests</h3>
          <p>{vendorRequests.length} received</p>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Follow-ups</h3>
          <p>
            {
              vendorRequests.filter(
                (request) =>
                  request.status === "processing"
              ).length
            }{" "}
            in progress
          </p>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-200 text-left">
            <th className="p-2">Client</th>
            <th className="p-2">Service</th>
            <th className="p-2">Notes</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {vendorRequests.map((request) => (
            <tr
              key={request._id}
              className="border-b"
            >
              <td className="p-2">
                {request.clientName}
              </td>

              <td className="p-2">
                {request.serviceName}
              </td>

              <td className="p-2">
                {request.notes}
              </td>

              <td className="p-2">
                {request.date}
              </td>

              <td className="p-2">
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
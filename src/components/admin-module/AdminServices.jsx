import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useEffect,
  useState,
} from "react";

import {
  fetchServices,
  updateServiceStatusAsync,
} from "../../redux/serviceSlice";

export default function AdminServices() {
  const dispatch = useDispatch();

  const services =
    useSelector(
      (state) => state.services.services
    ) || [];

  const loading =
    useSelector(
      (state) => state.services.loading
    );

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const filteredServices =
    services.filter((service) => {

      const title =
        service.title?.toLowerCase() || "";

      const vendorName =
        service.vendorName?.toLowerCase() || "";

      const search =
        searchTerm.toLowerCase();

      return (
        title.includes(search) ||
        vendorName.includes(search)
      );
    });

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Service Approvals
      </h2>

      <input
        type="text"
        placeholder="Search Services"
        className="border rounded px-3 py-2 w-full mb-4"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />

      {loading && (
        <p className="text-gray-500">
          Loading services...
        </p>
      )}

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
              Status
            </th>

            <th className="p-2">
              Actions
            </th>

          </tr>
        </thead>

        <tbody>
          {filteredServices.length >
          0 ? (
            filteredServices.map(
              (
                service,
                index
              ) => (
                <tr
                  key={service._id}
                  className="border-b"
                >
                  <td className="p-2">
                    {index + 1}
                  </td>

                  <td className="p-2">
                    {service.title}
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
                    <span
                      className={`px-2 py-1 rounded ${
                        service.status ===
                        "approved"
                          ? "bg-green-100 text-green-700"
                          : service.status ===
                            "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {
                        service.status
                      }
                    </span>
                  </td>

                  <td className="p-2 flex space-x-2">

                    {service.status ===
                      "pending" && (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() =>
                            dispatch(
                              updateServiceStatusAsync(
                                {
                                  serviceId:
                                    service._id,
                                  status:
                                    "approved",
                                }
                              )
                            )
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          onClick={() =>
                            dispatch(
                              updateServiceStatusAsync(
                                {
                                  serviceId:
                                    service._id,
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

                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center p-4 text-gray-500"
              >
                No services found.
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}
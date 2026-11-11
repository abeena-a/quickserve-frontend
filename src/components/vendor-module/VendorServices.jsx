import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  createService,
  fetchVendorServices,
  deleteServiceAsync,
} from "../../redux/serviceSlice";

export default function VendorServices() {
  const dispatch = useDispatch();

  const {
    services,
    loading,
    error,
  } = useSelector(
    (state) => state.services
  );

  const userRole = useSelector(
    (state) =>
      state.auth.currentUser?.role
  );

  const currentUserId = useSelector(
    (state) =>
      state.auth.currentUser?._id
  );

  useEffect(() => {
    dispatch(fetchVendorServices());
  }, [dispatch]);

  const [showWarning, setShowWarning] =
    useState(false);

  const [warningMessage, setWarningMessage] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
    });

  const [errors, setErrors] =
    useState({});

  const [showForm, setShowForm] =
    useState(false);

  const validate = () => {
    const newErrors = {};

    if (
      !formData.name ||
      formData.name.length < 3
    ) {
      newErrors.name =
        "Service name must be at least 3 characters.";
    }

    if (
      !formData.description ||
      formData.description.length < 10
    ) {
      newErrors.description =
        "Description must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length === 0
    ) {
      try {
        await dispatch(
          createService({
            title: formData.name,
            description:
              formData.description,
          })
        ).unwrap();

        setFormData({
          name: "",
          description: "",
        });

        setShowForm(false);

        alert(
          "Service submitted for admin approval!"
        );
      } catch (error) {
        alert(
          error.message ||
            "Failed to create service"
        );
      }
    }
  };

  const filteredServices =
    services.filter((service) => {
      const matchesSearch =
        service.title
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        service.vendorName
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      return (
        userRole === "vendor" &&
        String(service.vendorId) ===
          String(currentUserId) &&
        matchesSearch
      );
    });

  const handleDelete = async (
    serviceId
  ) => {
    try {
      await dispatch(
        deleteServiceAsync(serviceId)
      ).unwrap();

      alert(
        "Service removed successfully"
      );
    } catch (error) {
      alert(
        error.message ||
          "Failed to delete service"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading services...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          My Services
        </h2>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={() =>
            setShowForm(true)
          }
        >
          Add Service
        </button>
      </div>

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

      {/* Your existing Add Service modal can stay here */}
      {showForm && (
  <div className="fixed inset-0 flex justify-center items-center bg-white/30 backdrop-blur-sm z-50">
    <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          Create New Service
        </h3>

        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setShowForm(false)}
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >

        <div>
          <input
            type="text"
            placeholder="Service Name"
            className="border rounded w-full px-3 py-2"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Description"
            className="border rounded w-full px-3 py-2"
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target.value,
              })
            }
          />

          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-2">

          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() =>
              setShowForm(false)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

        </div>

      </form>
    </div>
  </div>
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

                  <td className="p-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() =>
                        handleDelete(
                          service._id
                        )
                      }
                    >
                      Remove
                    </button>
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
                No services found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
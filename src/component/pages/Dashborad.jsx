import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import AddressCard from "../address/AddressCard";
import AddressDetailsModal from "../address/AddressDetailsModal";
import { Plus, Search, Filter, Loader } from "lucide-react";
import CreateAddress from "../address/CreateAddress";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/authSlice";
import {
  fetchAllAddresses,
  selectAddresses,
  selectAddressLoading,
  selectAddressError,
} from "../../store/addressSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const addresses = useSelector(selectAddresses);
  const loading = useSelector(selectAddressLoading);
  const error = useSelector(selectAddressError);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const createAddressRef = useRef(null);

  // Fetch addresses on component mount
  useEffect(() => {
    if (token) {
      dispatch(fetchAllAddresses());
    }
  }, [token, dispatch]);

  // Handle refresh (re-fetch addresses)
  const handleRefresh = () => {
    if (token) {
      dispatch(fetchAllAddresses());
    }
  };

  const scrollToCreateAddress = () => {
    createAddressRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter addresses
  const filteredAddresses = addresses.filter((address) => {
    if (!address) return false;
    
    const matchesSearch =
      (address.addressName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (address.digitalAddress?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "ALL" ||
      address.consentType === filterType ||
      (address.purpose?.includes(filterType) || false);

    return matchesSearch && matchesFilter;
  });

  // Handle View Details
  const handleViewDetails = (address) => {
    setSelectedAddress(address);
    setShowDetailsModal(true);
  };

  // Handle Edit
  const handleEdit = (address) => {
    toast.success(`Edit feature coming soon for: ${address.addressName}`);
    // TODO: Implement edit functionality
  };

  // Handle Delete
  const handleDelete = (addressId) => {
    // Refresh the address list after deletion
    handleRefresh();
  };

  const stats = {
    total: addresses.length,
    permanent: addresses.filter((a) => a.consentType === "PERMANENT").length,
    temporary: addresses.filter((a) => a.consentType === "TEMPORARY").length,
    active: addresses.filter((a) => a.status === "ACTIVE").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 mt-20 pt-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Digital Addresses</h1>
        <p className="text-gray-600">View, edit, and manage all your digital addresses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-semibold">Total Addresses</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-semibold">Permanent</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.permanent}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-amber-600">
          <p className="text-gray-600 text-sm font-semibold">Temporary</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">{stats.temporary}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <p className="text-gray-600 text-sm font-semibold">Active</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.active}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or digital address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-50 border border-gray-200 cursor-pointer rounded-lg px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-600 outline-none"
          >
            <option value="ALL">All Types</option>
            <option value="PERMANENT">Permanent Only</option>
            <option value="TEMPORARY">Temporary Only</option>
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
          </select>

          {/* Create New Button */}
          <button onClick={scrollToCreateAddress} className="flex items-center justify-center gap-2 btn2color cursor-pointer font-bold rounded-lg hover:shadow-lg transition-shadow">
            <Plus className="w-5 h-5" /> Create New Address
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading your digital addresses...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Addresses Grid */}
      {!loading && filteredAddresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAddresses.map((address) => (
            <AddressCard
              key={address.id || address._id}
              address={address}
              onView={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : !loading && (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No digital addresses found</p>
          <p className="text-gray-500 mt-2">Create your first digital address to get started</p>
        </div>
      )}

      {/* Create Address Section */}
      <div ref={createAddressRef} className="mt-12">
        <CreateAddress onAddressCreated={handleRefresh} />
      </div>

      {/* Address Details Modal */}
      <AddressDetailsModal
        isOpen={showDetailsModal}
        address={selectedAddress}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAddress(null);
        }}
      />
    </div>
  );
}

export default Dashboard;

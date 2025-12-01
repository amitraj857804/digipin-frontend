import { useState, useRef } from "react";
import toast from "react-hot-toast";
import AddressCard from "../address/AddressCard";
import AddressDetailsModal from "../address/AddressDetailsModal";
import { Plus, Search, Filter } from "lucide-react";
import CreateAddress from "../address/CreateAddress";

function Dashboard() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      addressName: "My Home",
      purpose: "Personal - Home Address",
      address: "123 Main Street, Apartment 4B",
      pincode: "110001",
      digitalAddress: "amit_raj@home.add",
      consentType: "PERMANENT",
      consentDurationDays: null,
      uniPin: "123456",
      latitude: 28.6139,
      longitude: 77.2090,
      status: "ACTIVE",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      sharedWith: 5,
      deliveryCount: 12,
    },
    {
      id: 2,
      addressName: "Work Office",
      purpose: "Business - Office Address",
      address: "456 Business Plaza, Suite 200",
      pincode: "110002",
      digitalAddress: "amit_raj@work.add",
      consentType: "PERMANENT",
      consentDurationDays: null,
      uniPin: "654321",
      latitude: 28.5244,
      longitude: 77.1855,
      status: "ACTIVE",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: null,
      sharedWith: 3,
      deliveryCount: 8,
    },
    {
      id: 3,
      addressName: "Temporary Stay",
      purpose: "Temporary - Temporary Address",
      address: "789 Temporary Road, Block C",
      pincode: "110003",
      digitalAddress: "amit_raj@temp.add",
      consentType: "TEMPORARY",
      consentDurationDays: 30,
      uniPin: "789012",
      latitude: 28.5355,
      longitude: 77.3910,
      status: "ACTIVE",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: null,
      sharedWith: 1,
      deliveryCount: 2,
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const createAddressRef = useRef(null);

  const scrollToCreateAddress = () => {
    createAddressRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter addresses
  const filteredAddresses = addresses.filter((address) => {
    const matchesSearch =
      address.addressName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.digitalAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "ALL" ||
      address.consentType === filterType ||
      address.purpose.includes(filterType);

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
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== addressId));
      toast.success("Address deleted successfully!");
    }
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

      {/* Addresses Grid */}
      {filteredAddresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onView={handleViewDetails}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg">No digital addresses found</p>
          <p className="text-gray-500 mt-2">Create your first digital address to get started</p>
        </div>
      )}

      {/* Create Address Section */}
      <div ref={createAddressRef} className="mt-12">
        <CreateAddress />
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

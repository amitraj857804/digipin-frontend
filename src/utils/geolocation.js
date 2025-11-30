// Utility function to get user's geolocation
export const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({
          latitude: parseFloat(latitude.toFixed(6)),
          longitude: parseFloat(longitude.toFixed(6)),
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location access in browser settings.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = error.message;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

// Function to create digital address with geolocation
// Token is now passed from the component where useSelector can be used
export const createDigitalAddress = async (addressData, api, toast, token) => {
  try {
    // Get user's geolocation
    const geolocation = await getGeolocation();
    console.log(geolocation.latitude);
    console.log(geolocation.longitude);
    console.log(addressData.suffix);
    console.log(addressData.upiPin);
    console.log(addressData.consentType);
    console.log(addressData.consentDurationDays);
    console.log(addressData.address);
    // Prepare the request payload
    const payload = {
      suffix: addressData.suffix || "home.add",
      longitude: geolocation.longitude,
      latitude: geolocation.latitude,
      address: addressData.address || "",
      addressName: addressData.addressName || "",
      pincode: addressData.pincode || "",
      purpose: addressData.purpose || "",
      uniPin: addressData.uniPin || "",
      consentType: addressData.consentType || "PERMANENT",
      consentDurationDays: addressData.consentDurationDays || 365,
    };

    // Send request to create digital address with token in Authorization header
    const response = await api.post("/api/digital-address/create", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        
      }
    });

    if (response.data) {
      toast.success("Digital address created successfully!");
      return response.data;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.split(":")[1] || error.message || "Failed to create digital address";
    toast.error(errorMessage);
    throw error;
  }
};
